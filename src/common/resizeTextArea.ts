export const resizeTextArea = (text:any)=>{
  const textarea =  text;
  const promise = new Promise((resolve)=> {
    resolve(textarea.value.style.height = 'auto')
  });
  promise.then(()=>{
    textarea.value.style.height = textarea.value.scrollHeight + 'px'
  });
}
