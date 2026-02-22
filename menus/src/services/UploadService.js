import Api from "./Api"

export default {
  upload(formData){
    return Api().post("upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  }
}