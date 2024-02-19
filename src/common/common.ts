//resize text area
export const resizeTextArea = (text:any)=>{
  const textarea =  text;
  const promise = new Promise((resolve)=> {
    resolve(textarea.value.style.height = 'auto')
  });
  promise.then(()=>{
    textarea.value.style.height = textarea.value.scrollHeight + 'px'
  });
}
//timestamp to yy/mm/dd hh:mm
export const formatDateTime = (date:Date)=> {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}