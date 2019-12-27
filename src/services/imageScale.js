function fn(w, h, max){
    max = max||600
  let scale = max/w
  let _maxW = w*scale
  let _maxH = h*scale
  return {
    width: Math.round(_maxW),
    height: Math.round(_maxH)
  }
}
export default fn