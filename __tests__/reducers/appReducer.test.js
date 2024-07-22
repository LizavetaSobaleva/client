import appReducer, { showLoader, hideLoader, setFileView } from '../../src/reducers/appReducer';

describe('appReducer', () => {
    const initialState = {
        loader: false,
        view: 'list',
    };

    it('should return the initial state', () => {
        expect(appReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle SHOW_LOADER', () => {
        const expectedState = { ...initialState, loader: true };
        expect(appReducer(initialState, showLoader())).toEqual(expectedState);
    });

    it('should handle HIDE_LOADER', () => {
        const stateWithLoader = { ...initialState, loader: true };
        const expectedState = { ...initialState, loader: false };
        expect(appReducer(stateWithLoader, hideLoader())).toEqual(expectedState);
    });

    it('should handle SET_VIEW', () => {
        const newView = 'grid';
        const expectedState = { ...initialState, view: newView };
        expect(appReducer(initialState, setFileView(newView))).toEqual(expectedState);
    });
});
