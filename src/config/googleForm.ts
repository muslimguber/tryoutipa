/**
 * Configuration for Google Form integration.
 * To get the entry IDs:
 * 1. Open your Google Form
 * 2. Click "Get pre-filled link" from the three-dot menu
 * 3. Fill in some sample data and click "Get link"
 * 4. Copy the link and look for "entry.XXXXXX=" parameters
 */
export const GOOGLE_FORM_CONFIG = {
  // Replace with your actual Google Form ID for Quiz Rekap (from the URL)
  formId: '1FAIpQLScPEq4lH7-oyl_HypqoWOmOK_8cnynrzXcouHuTwI29u8es2A', 
  
  // Replace with your actual Entry IDs for Quizzes
  entries: {
    name: 'entry.686015244',    // Entry ID for "Nama"
    userClass: 'entry.2130309312', // Entry ID for "Kelas"
    score: 'entry.1698413794',   // Entry ID for "Nilai"
    quizName: 'entry.1415345765', // Entry ID for "Nama Kuis/Materi"
    date: 'entry.date_placeholder', // Entry ID for "Tanggal" (optional)
  },

  // Configuration specifically for Refleksi (Set your own Google Form ID here)
  refleksiFormId: '1FAIpQLSelV5aVViCBX113SraUVCODc_QJtIDj-bPIizxG80-BKsu1Yw', 
  refleksiEntries: {
    name: 'entry.1985914547',       // Entry ID for "Nama"
    userClass: 'entry.270105356',   // Entry ID for "Kelas"
    q1: 'entry.1634865877',          // Entry ID for Question 1
    q2: 'entry.1947591973',          // Entry ID for Question 2
    q3: 'entry.571628857',          // Entry ID for Question 3
    q4: 'entry.535158828',          // Entry ID for Question 4
    q5: 'entry.355281989'           // Entry ID for Question 5
  }
};
