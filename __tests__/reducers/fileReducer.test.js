import fileReducer, { 
    setFiles, 
    setCurrentDir, 
    addFile, 
    setPopupDisplay, 
    pushToStack, 
    popFromStack, 
    clearStack, 
    deleteFileAction, 
    setStructure 
  } from '../../src/reducers/fileReducer';
  
  describe('fileReducer', () => {
    const initialState = {
      files: [],
      currentDir: null,
      popupDisplay: 'none',
      dirStack: [],
      dirStructure: [],
    };
  
    it('should return the initial state', () => {
      expect(fileReducer(undefined, {})).toEqual(initialState);
    });
  
    it('should handle setFiles', () => {
      const files = [{ id: 1, name: 'file1' }];
      const action = setFiles(files);
      const expectedState = { ...initialState, files };
      expect(fileReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle setCurrentDir', () => {
      const currentDir = 'dir1';
      const action = setCurrentDir(currentDir);
      const expectedState = { ...initialState, currentDir };
      expect(fileReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle addFile', () => {
      const file = { id: 2, name: 'file2' };
      const action = addFile(file);
      const expectedState = { ...initialState, files: [file] };
      expect(fileReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle setPopupDisplay', () => {
      const display = 'block';
      const action = setPopupDisplay(display);
      const expectedState = { ...initialState, popupDisplay: display };
      expect(fileReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle pushToStack', () => {
      const dir = 'dir1';
      const action = pushToStack(dir);
      const expectedState = { ...initialState, dirStack: [dir] };
      expect(fileReducer(initialState, action)).toEqual(expectedState);
    });
  
    it('should handle popFromStack', () => {
      const state = { ...initialState, dirStack: ['dir1', 'dir2'] };
      const action = popFromStack();
      const expectedState = { ...initialState, dirStack: ['dir1'] };
      expect(fileReducer(state, action)).toEqual(expectedState);
    });
  
    it('should handle clearStack', () => {
      const state = { ...initialState, dirStack: ['dir1', 'dir2'] };
      const action = clearStack();
      expect(fileReducer(state, action)).toEqual(initialState);
    });
  
    it('should handle deleteFileAction', () => {
      const state = { ...initialState, files: [{ _id: 1, name: 'file1' }, { _id: 2, name: 'file2' }] };
      const action = deleteFileAction(1);
      const expectedState = { ...initialState, files: [{ _id: 2, name: 'file2' }] };
      expect(fileReducer(state, action)).toEqual(expectedState);
    });
  
    it('should handle setStructure', () => {
      const dirStructure = [{ id: 1, name: 'dir1' }];
      const action = setStructure(dirStructure);
      const expectedState = { ...initialState, dirStructure };
      expect(fileReducer(initialState, action)).toEqual(expectedState);
    });
  });
  