function isEmpty(value: string | null) {
  if(value) {
    return ''
  } else {
    return 'Field is required'
  }
}

function validateAmount (value: string, minValue: string) {
  const amount = parseInt(value.replace(/\s/g, ''));
  const minAmount = parseInt(minValue.replace(/\s/g, ''));
  
  if (!value || amount >= minAmount) {
    return ''
  } else {
    return `Amount can't be less than ${minValue}` 
  }
}

function validateEmail(value: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!value || emailRegex.test(value)) {
    return ''
  } else {
    return `Wrong email format` 
  }
}

function validateLength(value: string, minLength: number) {
  if (value.length == 0 || value.length >= minLength) {
    return ''
  } else {
    return `Wrong phone number` 
  }
}

export {
  isEmpty,
  validateAmount,
  validateEmail,
  validateLength
}