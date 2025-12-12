import { SubmissionRepository } from '../repositories/submissionRepository';
import { AssignmentRepository } from '../repositories/assignmentRepository';
import { CustomError } from '../middlewares/errorHandler';
import { HTTP_STATUS } from '../utils/constants';
import axios from 'axios';
import {SubmissionCreateRequest, SubmissionGradeRequest, GetSubmissionsRequest} from "../dto/request/submissionRequest"




export class SubmissionService {
  private submissionRepository: SubmissionRepository;
  private assignmentRepository: AssignmentRepository;

  constructor() {
    this.submissionRepository = new SubmissionRepository();
    this.assignmentRepository = new AssignmentRepository();
  }

  async submitAssignment(request: SubmissionCreateRequest) {
    const { assignment_id, student_id, response_data, code, language } = request;

    // Get assignment details
    const assignment = await this.assignmentRepository.findById(assignment_id);
    if (!assignment) {
      throw new CustomError('Assignment not found', HTTP_STATUS.NOT_FOUND);
    }

    let is_correct: boolean | null = null;
    let marks = 0;

    // Auto-check based on assignment type
    if (assignment.type === 'QUIZ') {
      const result = await this.checkQuizSubmission(assignment, response_data);
      is_correct = result.is_correct;
      marks = result.marks;
    } else if (assignment.type === 'PUZZLE') {
      const result = await this.checkPuzzleSubmission(assignment, response_data);
      is_correct = result.is_correct;
      marks = result.marks;
    } else if (assignment.type === 'CODE_EXERCISE') {
      const result = await this.checkCodeSubmission(assignment, code, language);
      is_correct = result.is_correct;
      marks = result.marks;
    }

    // Create submission
    return await this.submissionRepository.create({
      assignment_id,
      student_id,
      response_data,
      code,
      language,
      is_correct,
      marks_obtained: marks,
    });
  }

  async getSubmissions(request: GetSubmissionsRequest) {
    const { assignment_id, student_id, graded_by, page = 1, limit = 10 } = request;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (assignment_id) where.assignment_id = assignment_id;
    if (student_id) where.student_id = student_id;
    if (graded_by) where.graded_by = graded_by;

    const [submissions, total] = await Promise.all([
      this.submissionRepository.findMany(where, skip, limit),
      this.submissionRepository.count(where),
    ]);

    return {
      submissions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async gradeSubmission(request: SubmissionGradeRequest) {
    const { submission_id, marks_obtained, is_correct, feedback, graded_by } = request;

    const submission = await this.submissionRepository.findById(submission_id);
    if (!submission) {
      throw new CustomError('Submission not found', HTTP_STATUS.NOT_FOUND);
    }

    return await this.submissionRepository.update(submission_id, {
      marks_obtained,
      is_correct,
      feedback,
      graded_by,
      graded_at: new Date(),
    });
  }

  async deleteSubmission(submissionId: string) {
    const submission = await this.submissionRepository.findById(submissionId);
    if (!submission) {
      throw new CustomError('Submission not found', HTTP_STATUS.NOT_FOUND);
    }

    await this.submissionRepository.delete(submissionId);
    return { message: 'Submission deleted successfully' };
  }

  async getSubmissionById(submissionId: string) {
    const submission = await this.submissionRepository.findById(submissionId);
    if (!submission) {
      throw new CustomError('Submission not found', HTTP_STATUS.NOT_FOUND);
    }
    return submission;
  }

  async getSubmissionsByStudent(studentId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [submissions, total] = await Promise.all([
      this.submissionRepository.findByStudent(studentId, skip, limit),
      this.submissionRepository.countByStudent(studentId),
    ]);

    return {
      submissions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getSubmissionsByAssignment(assignmentId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [submissions, total] = await Promise.all([
      this.submissionRepository.findByAssignment(assignmentId, skip, limit),
      this.submissionRepository.countByAssignment(assignmentId),
    ]);

    return {
      submissions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private async checkQuizSubmission(assignment: any, responseData: any) {
    if (!assignment.metadata) {
      throw new CustomError('Quiz metadata missing', HTTP_STATUS.BAD_REQUEST);
    }

    const metadata = assignment.metadata as any;
    const correctAnswers = metadata.questions.map((q: any) => q.answer);
    const studentAnswers = responseData.answers;
    const score = studentAnswers.filter(
      (ans: any, i: number) => ans === correctAnswers[i]
    ).length;

    return {
      is_correct: score === correctAnswers.length,
      marks: score,
    };
  }

  private async checkPuzzleSubmission(assignment: any, responseData: any) {
    if (!assignment.metadata) {
      throw new CustomError('Puzzle metadata missing', HTTP_STATUS.BAD_REQUEST);
    }

    const metadata = assignment.metadata as any;
    const isCorrect = JSON.stringify(responseData.solution) === JSON.stringify(metadata.correct_solution);

    return {
      is_correct: isCorrect,
      marks: isCorrect ? assignment.reward_points : 0,
    };
  }

  private async checkCodeSubmission(assignment: any, code: string, language: string) {
    if (!assignment.metadata) {
      throw new CustomError('Code exercise metadata missing', HTTP_STATUS.BAD_REQUEST);
    }

    const metadata = assignment.metadata as any;
    const testCases = metadata.test_cases;
    let totalCorrect = 0;

    for (let test of testCases) {
      try {
        const submission = await axios.post(
          'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
          {
            source_code: code,
            language_id: this.getLanguageId(language),
            stdin: test.input,
            expected_output: test.output,
          },
          {
            headers: {
              'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            },
          }
        );

        if (submission.data.status.id === 3) totalCorrect++;
      } catch (error) {
        console.error('Judge0 API error:', error);
        // Continue with other test cases
      }
    }

    const isCorrect = totalCorrect === testCases.length;
    return {
      is_correct: isCorrect,
      marks: isCorrect ? assignment.reward_points : 0,
    };
  }

  private getLanguageId(lang: string): number {
    switch (lang) {
      case 'python':
        return 71;
      case 'javascript':
        return 63;
      case 'cpp':
        return 54;
      case 'java':
        return 62;
      default:
        return 71;
    }
  }
}
