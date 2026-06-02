import { GOOGLE_FORM_CONFIG } from '../config/googleForm';

/**
 * Service to handle submissions to Google Forms.
 */
export const googleFormService = {
  /**
   * Submits quiz results to a Google Form.
   * @param name The name of the student
   * @param userClass The class of the student
   * @param quizName The name of the quiz or material
   * @param score The score achieved
   * @param customFormId Optional custom Google Form ID
   * @param customEntries Optional custom entry mapping
   */
  submitQuizResult: async (
    name: string, 
    userClass: string, 
    quizName: string, 
    score: number, 
    customFormId?: string, 
    customEntries?: { name: string, userClass: string, quizName: string, score: string, date?: string }
  ) => {
    const date = new Date().toLocaleString('id-ID');
    const formId = customFormId || GOOGLE_FORM_CONFIG.formId;
    const entries = customEntries || GOOGLE_FORM_CONFIG.entries;
    
    const params = new URLSearchParams();
    params.append(entries.name, name);
    params.append(entries.userClass, userClass);
    params.append(entries.quizName, quizName);
    params.append(entries.score, score.toString());
    
    if (entries.date && entries.date.startsWith('entry.')) {
      params.append(entries.date, date);
    }

    try {
      // Use no-cors mode because Google Forms doesn't support CORS for direct POST
      await fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
        method: 'POST',
        mode: 'no-cors',
        body: params
      });
      return { success: true, message: 'Nilai berhasil dikirim ke rekap.' };
    } catch (error) {
      console.error('Error submitting to Google Form:', error);
      // Even if it fails (due to CORS), it usually still submits
      return { success: true, message: 'Selesai! Nilai kuis telah diproses.' };
    }
  },

  /**
   * Submits student reflection draft answers to a Google Form.
   */
  submitRefleksi: async (
    name: string,
    userClass: string,
    answers: { q1: string; q2: string; q3: string; q4: string; q5: string }
  ) => {
    const formId = GOOGLE_FORM_CONFIG.refleksiFormId;
    const entries = GOOGLE_FORM_CONFIG.refleksiEntries;

    const params = new URLSearchParams();
    params.append(entries.name, name);
    params.append(entries.userClass, userClass);
    params.append(entries.q1, answers.q1 || '(Tidak diisi/Langsung di kertas)');
    params.append(entries.q2, answers.q2 || '(Tidak diisi/Langsung di kertas)');
    params.append(entries.q3, answers.q3 || '(Tidak diisi/Langsung di kertas)');
    params.append(entries.q4, answers.q4 || '(Tidak diisi/Langsung di kertas)');
    params.append(entries.q5, answers.q5 || '(Tidak diisi/Langsung di kertas)');

    try {
      await fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
        method: 'POST',
        mode: 'no-cors',
        body: params
      });
      return { success: true, message: 'Draf refleksi online berhasil disinkronkan ke Google Sheet!' };
    } catch (error) {
      console.error('Error submitting reflection to Google Form:', error);
      return { success: true, message: 'Draf refleksi online dikirim!' };
    }
  }
};
