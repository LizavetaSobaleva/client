import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { instanceAxios } from '../../src/actions/user';
import {
  getFiles,
  createDir,
  uploadFile,
  downloadFile,
  deleteFile,
  searchFiles,
  getStructure
} from '../../src/actions/file';
import { setFiles, addFile, deleteFileAction, setStructure, addUploadFile, showUploader, changeUploadFile } from '../../src/reducers/fileReducer';

jest.mock('../../src/reducers/fileReducer', () => ({
  setFiles: jest.fn(),
  addFile: jest.fn(),
  deleteFileAction: jest.fn(),
  setStructure: jest.fn(),
  addUploadFile: jest.fn(),
  showUploader: jest.fn(),
  changeUploadFile: jest.fn(),
}));

describe('file actions', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(instanceAxios);
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    if (mock) {
      mock.restore();
    }
    window.alert.mockRestore();
    URL.createObjectURL.mockRestore();
  });

  beforeAll(() => {
    // Mocking URL.createObjectURL
    Object.defineProperty(URL, 'createObjectURL', {
      writable: true,
      value: jest.fn().mockReturnValue('blob:test')
    });
  });

  test('getFiles action', async () => {
    const mockData = [{ id: 1, name: 'test' }];
    mock.onGet('files').reply(200, mockData);

    const dispatch = jest.fn();
    await getFiles()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: 'SHOW_LOADER' });
    expect(dispatch).toHaveBeenCalledWith(setFiles(mockData));
    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADER' });
  });

  test('createDir action', async () => {
    const mockData = { id: 1, name: 'test' };
    mock.onPost('files').reply(200, mockData);

    const dispatch = jest.fn();
    await createDir(null, 'test')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(addFile(mockData));
  });

  test('uploadFile action', async () => {
    const mockData = { id: 1, name: 'test' };
    mock.onPost('files/upload').reply(200, mockData);

    const dispatch = jest.fn();
    const file = new Blob(['file content'], { type: 'text/plain' });

    await uploadFile(file)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showUploader());
    expect(dispatch).toHaveBeenCalledWith(addUploadFile(expect.objectContaining({
      name: file.name,
      process: 0
    })));
    expect(dispatch).toHaveBeenCalledWith(changeUploadFile(expect.objectContaining({
      name: file.name
    })));
    expect(dispatch).toHaveBeenCalledWith(addFile(mockData));
  });

  test('downloadFile action', async () => {
    const file = { _id: '123', name: 'test.txt' };
    const mockData = new Blob(['test content'], { type: 'text/plain' });
    mock.onGet(`files/download?id=${file._id}`).reply(200, mockData);

    const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});
    const removeSpy = jest.spyOn(HTMLAnchorElement.prototype, 'remove').mockImplementation(() => {});

    await downloadFile(file);

    expect(URL.createObjectURL).toHaveBeenCalledWith(mockData);
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
  });

  test('deleteFile action', async () => {
    const mockData = { message: 'File deleted' };
    mock.onDelete('files?id=1').reply(200, mockData);

    const dispatch = jest.fn();
    const file = { _id: 1 };
    await deleteFile(file)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(deleteFileAction(1));
  });

  test('searchFiles action', async () => {
    const mockData = [{ id: 1, name: 'test' }];
    mock.onGet('files/search?search=test').reply(200, mockData);

    const dispatch = jest.fn();
    await searchFiles('test')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setFiles(mockData));
    expect(dispatch).toHaveBeenCalledWith({ type: 'HIDE_LOADER' });
  });

  test('getStructure action', async () => {
    const mockData = [{ id: 1, name: 'test' }];
    mock.onGet('files/structure').reply(200, mockData);

    const dispatch = jest.fn();
    await getStructure()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(setStructure(mockData));
  });
});
