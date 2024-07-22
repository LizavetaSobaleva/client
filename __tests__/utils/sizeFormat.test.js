import sizeFormat from '../../src/utils/sizeFormat';

describe('sizeFormat utility function', () => {
    test('formats size in bytes', () => {
        expect(sizeFormat(500)).toBe('500B');
    });

    test('formats size in kilobytes', () => {
        expect(sizeFormat(2048)).toBe('2.0 Kb');
    });

    test('formats size in megabytes', () => {
        expect(sizeFormat(5 * 1024 * 1024)).toBe('5.0 Mb');
    });

    test('formats size in gigabytes', () => {
        expect(sizeFormat(3 * 1024 * 1024 * 1024)).toBe('3.0 Gb');
    });

    test('formats edge case sizes', () => {
        expect(sizeFormat(1024)).toBe('1.0 Kb');
        expect(sizeFormat(1024 * 1024)).toBe('1.0 Mb');
        expect(sizeFormat(1024 * 1024 * 1024)).toBe('1.0 Gb');
    });
});
