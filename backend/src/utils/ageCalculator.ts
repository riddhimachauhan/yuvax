export function calculateAge(dobString: string): number {
  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) {
    throw new Error("Invalid date format");
  }

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();
  

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}