let jt = {
  // 循环
  foreach(arr, func) {
    for (var i in arr) {
      if (func(i, arr[i]) === false) {
        return false
      }
    }
    return true
  }
}
export default jt
