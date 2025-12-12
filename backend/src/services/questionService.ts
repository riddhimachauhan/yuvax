import { QuestionRepository } from "../repositories/questionRepository";
import { CustomError } from "../middlewares/errorHandler";
import { HTTP_STATUS } from "../utils/constants";

export interface CreateQuestionData {
  quiz_id: string;
  text: string;
  marks?: number;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_answer: number;
}

export interface UpdateQuestionData {
  text?: string;
  marks?: number;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  correct_answer?: number;
}

export class QuestionService {
  private questionRepository: QuestionRepository;

  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  async createQuestion(questionData: CreateQuestionData) {
    // Validate required fields
    if (
      !questionData.quiz_id ||
      !questionData.text ||
      !questionData.option1 ||
      !questionData.option2 ||
      !questionData.option3 ||
      !questionData.option4 ||
      !questionData.correct_answer
    ) {
      throw new CustomError("All fields are required", HTTP_STATUS.BAD_REQUEST);
    }

    // Check if quiz exists
    const quizExists = await this.questionRepository.quizExists(
      questionData.quiz_id
    );
    if (!quizExists) {
      throw new CustomError("Quiz not found", HTTP_STATUS.BAD_REQUEST);
    }

    // Check number of questions in this quiz (max 10)
    const questionCount = await this.questionRepository.getQuestionCountByQuiz(
      questionData.quiz_id
    );
    if (questionCount >= 10) {
      throw new CustomError(
        "Maximum 10 questions per quiz allowed",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    // Check if question already exists for this quiz
    const existingQuestion =
      await this.questionRepository.findDuplicateQuestion(
        questionData.quiz_id,
        questionData.text
      );
    if (existingQuestion) {
      throw new CustomError(
        "This question already exists in the quiz",
        HTTP_STATUS.CONFLICT
      );
    }

    // Validate correct answer is one of the options
    if (questionData.correct_answer < 1 || questionData.correct_answer > 4) {
      throw new CustomError(
        "Correct answer must be one of the provided options",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const question = await this.questionRepository.create({
      ...questionData,
      marks: questionData.marks || 1, // Default marks
    } as any);

    return question;
  }

  async getQuestionById(questionId: string) {
    const question = await this.questionRepository.findByIdWithRelations(
      questionId
    );
    if (!question) {
      throw new CustomError("Question not found", HTTP_STATUS.NOT_FOUND);
    }

    return question;
  }

  async getAllQuestions(page: number = 1, limit: number = 10) {
  return this.questionRepository.findAll(page, limit);
}


  async getQuestionsByQuiz(quizId: string) {
    // Check if quiz exists
    const quizExists = await this.questionRepository.quizExists(quizId);
    if (!quizExists) {
      throw new CustomError("Quiz not found", HTTP_STATUS.NOT_FOUND);
    }

    const questions = await this.questionRepository.findByQuiz(quizId);
    console.log("questions are :", questions);
    return questions;
  }

  async updateQuestion(questionId: string, questionData: UpdateQuestionData) {
    // Check if question exists
    const existingQuestion = await this.questionRepository.findById(questionId);
    if (!existingQuestion) {
      throw new CustomError("Question not found", HTTP_STATUS.NOT_FOUND);
    }

    // If correct answer is being updated, validate it
    if (questionData.correct_answer) {
      const options = [
        questionData.option1 || existingQuestion.option1,
        questionData.option2 || existingQuestion.option2,
        questionData.option3 || existingQuestion.option3,
        questionData.option4 || existingQuestion.option4,
      ];

      const index = questionData.correct_answer;

      // Ensure the index is valid
      if (index < 1 || index > options.length) {
        throw new CustomError(
          "Correct answer must be between 1 and 4",
          HTTP_STATUS.BAD_REQUEST
        );
      }

      // Also check that the corresponding option exists
      if (!options[index - 1]) {
        throw new CustomError(
          `Option ${index} is not provided`,
          HTTP_STATUS.BAD_REQUEST
        );
      }
    }

    const updatedQuestion = await this.questionRepository.update(
      questionId,
      questionData
    );
    return updatedQuestion;
  }

  async deleteQuestion(questionId: string) {
    // Check if question exists
    const existingQuestion = await this.questionRepository.findById(questionId);
    if (!existingQuestion) {
      throw new CustomError("Question not found", HTTP_STATUS.NOT_FOUND);
    }

    // Check if question has answers
    const hasAnswers = await this.questionRepository.hasAnswers(questionId);
    if (hasAnswers) {
      throw new CustomError(
        "Cannot delete question with existing answers",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    await this.questionRepository.delete(questionId);
    return { message: "Question deleted successfully" };
  }

  async getQuestionStats(questionId: string) {
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      throw new CustomError("Question not found", HTTP_STATUS.NOT_FOUND);
    }

    return await this.questionRepository.getQuestionStats(questionId);
  }

  async searchQuestions(query: string, page: number = 1, limit: number = 10) {
    const result = await this.questionRepository.searchQuestions(
      query,
      page,
      limit
    );
    return result;
  }
}
