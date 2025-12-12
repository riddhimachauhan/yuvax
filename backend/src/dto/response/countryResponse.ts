export interface CountryResponse {
  country_id: string;
  session_id: string;
  teacher_id: string;
  category_id: string;
  price_per_session: number;
  country_name: string;
  isoCode: string;
  zoneId?: string;
  currency: string;
  coursePriceFactor: number;
  
  // Dynamic pricing fields
  scratchCoding?: number;
  scratchCoding_base_price?: number;
  scratchCoding_discounted_price?: number;
  scratchCoding_real_price?: number;
  
  webDevelopment?: number;
  webDevelopment_base_price?: number;
  webDevelopment_discounted_price?: number;
  webDevelopment_real_price?: number;
  
  pythonProgramming?: number;
  pythonProgramming_base_price?: number;
  pythonProgramming_discounted_price?: number;
  pythonProgramming_real_price?: number;
  
  appDevelopment?: number;
  appDevelopment_base_price?: number;
  appDevelopment_discounted_price?: number;
  appDevelopment_real_price?: number;
  
  gameDevelopment?: number;
  gameDevelopment_base_price?: number;
  gameDevelopment_discounted_price?: number;
  gameDevelopment_real_price?: number;
  
  aiForKids?: number;
  aiForKids_base_price?: number;
  aiForKids_discounted_price?: number;
  aiForKids_real_price?: number;
  
  aiMlBasics?: number;
  aiMlBasics_base_price?: number;
  aiMlBasics_discounted_price?: number;
  aiMlBasics_real_price?: number;
  
  spokenEnglish?: number;
  spokenEnglish_base_price?: number;
  spokenEnglish_discounted_price?: number;
  spokenEnglish_real_price?: number;
  
  publicSpeaking?: number;
  publicSpeaking_base_price?: number;
  publicSpeaking_discounted_price?: number;
  publicSpeaking_real_price?: number;
  
  businessCommunication?: number;
  businessCommunication_base_price?: number;
  businessCommunication_discounted_price?: number;
  businessCommunication_real_price?: number;
  
  academicEnglishForStem?: number;
  academicEnglishForStem_base_price?: number;
  academicEnglishForStem_discounted_price?: number;
  academicEnglishForStem_real_price?: number;
  
  financialLiteracyForKids?: number;
  financialLiteracyForKids_base_price?: number;
  financialLiteracyForKids_discounted_price?: number;
  financialLiteracyForKids_real_price?: number;
  
  personalFinanceForTeens?: number;
  personalFinanceForTeens_base_price?: number;
  personalFinanceForTeens_discounted_price?: number;
  personalFinanceForTeens_real_price?: number;
  
  entrepreneurshipBasics?: number;
  entrepreneurshipBasics_base_price?: number;
  entrepreneurshipBasics_discounted_price?: number;
  entrepreneurshipBasics_real_price?: number;
  
  freelancing101?: number;
  freelancing101_base_price?: number;
  freelancing101_discounted_price?: number;
  freelancing101_real_price?: number;
  
  resumeInterviewPrep?: number;
  resumeInterviewPrep_base_price?: number;
  resumeInterviewPrep_discounted_price?: number;
  resumeInterviewPrep_real_price?: number;
  
  canvaForKids?: number;
  canvaForKids_base_price?: number;
  canvaForKids_discounted_price?: number;
  canvaForKids_real_price?: number;
  
  graphicDesignBasics?: number;
  graphicDesignBasics_base_price?: number;
  graphicDesignBasics_discounted_price?: number;
  graphicDesignBasics_real_price?: number;
  
  youtubeEditing?: number;
  youtubeEditing_base_price?: number;
  youtubeEditing_discounted_price?: number;
  youtubeEditing_real_price?: number;
  
  designThinking?: number;
  designThinking_base_price?: number;
  designThinking_discounted_price?: number;
  designThinking_real_price?: number;
  
  digitalLiteracy?: number;
  digitalLiteracy_base_price?: number;
  digitalLiteracy_discounted_price?: number;
  digitalLiteracy_real_price?: number;
  
  logicMathGames?: number;
  logicMathGames_base_price?: number;
  logicMathGames_discounted_price?: number;
  logicMathGames_real_price?: number;
  
  greenSkills?: number;
  greenSkills_base_price?: number;
  greenSkills_discounted_price?: number;
  greenSkills_real_price?: number;
  
  girlsInStemProgram?: number;
  girlsInStemProgram_base_price?: number;
  girlsInStemProgram_discounted_price?: number;
  girlsInStemProgram_real_price?: number;
  
  createdAt: string;
  updatedAt: string;
  
  // Relations
  zone?: {
    zone_id: string;
    zone_name: string;
  };
  category?: {
    category_id: string;
    category_name: string;
    category_description: string;
  };
}

export interface CountryListResponse {
  success: boolean;
  message: string;
  countries: CountryResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CountryDetailResponse {
  success: boolean;
  message: string;
  data: CountryResponse;
}
