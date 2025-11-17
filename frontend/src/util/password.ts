const minimumPasswordLength = 8;
const minimumPasswordNumberCount = 1;

function passwordMeetsRequirements(password: string) {
  if(password.length < minimumPasswordLength) {
    return false;
  }
  if((password.match(/\d/g) || []).length < minimumPasswordNumberCount) {
    return false;
  }
  
  return true;
}
