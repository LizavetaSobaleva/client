// __tests__/reducers/uploadReducer.test.js
import uploadReducer, {
    showUploader, hideUploader, addUploadFile, removeUploadFile, changeUploadFile
  } from '../../src/reducers/uploadReducer';
  
  describe('uploadReducer', () => {
    const initialState = {
      isVisible: false,
      files: []
    };
  
    it('should return the initial state', () => {
      expect(uploadReducer(undefined, {})).toEqual(initialState);
    });
  
    it('should handle SHOW_UPLOADER', () => {
      const action = showUploader();
      const expectedState = {
        ...initialState,
        isVisible: true,
      };
  
      expect(uploadReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle HIDE_UPLOADER', () => {
      const state = {
        isVisible: true,
        files: [{ id: 1, name: 'file1' }]
      };
      const action = hideUploader();
      const expectedState = {
        isVisible: false,
        files: []
      };
  
      expect(uploadReducer(state, action)).toEqual(expectedState);
    });
  
    it('should handle ADD_UPLOAD_FILE', () => {
      const file = { id: 1, name: 'file1' };
      const action = addUploadFile(file);
      const expectedState = {
        ...initialState,
        files: [file],
      };
  
      expect(uploadReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle REMOVE_UPLOAD_FILE', () => {
      const state = {
        isVisible: true,
        files: [{ id: 1, name: 'file1' }, { id: 2, name: 'file2' }]
      };
      const action = removeUploadFile(1);
      const expectedState = {
        ...state,
        files: [{ id: 2, name: 'file2' }],
      };
  
      expect(uploadReducer(state, action)).toEqual(expectedState);
    });
  
    it('should handle CHANGE_UPLOAD_FILE', () => {
      const state = {
        isVisible: true,
        files: [{ id: 1, name: 'file1', progress: 0 }]
      };
      const updatedFile = { id: 1, progress: 50 };
      const action = changeUploadFile(updatedFile);
      const expectedState = {
        ...state,
        files: [{ id: 1, name: 'file1', progress: 50 }],
      };
  
      expect(uploadReducer(state, action)).toEqual(expectedState);
    });
  });
  