import { hideLoader, showLoader } from "../reducers/appReducer"
import { addFile, deleteFileAction, setFiles, setStructure } from "../reducers/fileReducer"
import { addUploadFile, changeUploadFile, showUploader } from "../reducers/uploadReducer"
import { instanceAxios } from "./user"

export function getFiles(dirId) {
  return async (dispatch) => {
    try {
      dispatch(showLoader())
      const response = await instanceAxios.get(`files${dirId ? '?parent='+dirId : ''}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      )
      dispatch(setFiles(response.data))
    } catch (e) {
      console.log(e.response.data.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function createDir(dirId, name) {
  return async (dispatch) => {
    try {
      const response = await instanceAxios.post(`files`, {
          name,
          parent: dirId,
          type: 'dir'
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
        )
      dispatch(addFile(response.data))
    } catch (e) {
      alert(e.response.data.message)
    }
  }
} 

export function uploadFile(file, dirId) {
  return async (dispatch) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if(dirId) {
        formData.append('parent', dirId)
      }
      const uploadFile = {name: file.name, process: 0, id: Date.now()}
      dispatch(showUploader())
      dispatch(addUploadFile(uploadFile))
      const response = await instanceAxios.post(`files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
            const totalLength = progressEvent.event.lengthComputable ? progressEvent.event.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length')
            if(totalLength) {
              uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
              dispatch(changeUploadFile(uploadFile))
            }
          }
        }
      )
      dispatch(addFile(response.data))
    } catch (e) {
      alert(e.response.data.message)
    }
  }
} 

export async function downloadFile(file) {
  try {
    const response = await instanceAxios.get(`files/download?id=${file._id}`, {
      responseType: 'blob',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    )
    const blob = new Blob([response.data], { type: response.headers['content-type']})

    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = file.name

    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (e) {
    console.log(e.response.data.message)
  }
}

export function deleteFile(file) {
  return async (dispatch) => {
    try {
      const response = await instanceAxios.delete(`files?id=${file._id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      )
      dispatch(deleteFileAction(file._id))
      alert(response.data.message)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

export function searchFiles(search) {
  return async (dispatch) => {
    try {
      const response = await instanceAxios.get(`files/search?search=${search}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      )
      dispatch(setFiles(response.data))
    } catch (e) {
      alert(e?.response?.data?.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function getStructure() {
  return async (dispatch) => {
    try {
      const response = await instanceAxios.get(`files/structure`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      )
      dispatch(setStructure(response.data))
    } catch (e) {
      alert(e?.response?.data?.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}