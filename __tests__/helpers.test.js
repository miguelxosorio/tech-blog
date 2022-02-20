const { format_date } = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date = new Date('2022-02-20 17:04:30');
    expect(format_date(date)).toBe('2/20/2022');
});