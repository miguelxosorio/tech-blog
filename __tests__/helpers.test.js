const { format_date } = require('../utils/helpers');
const { format_plural } = require('../utils/helpers');
const { format_url } = require('../utils/helpers');

// test to format the date to M/DD/YYYY
test('format_date() returns a date string', () => {
    const date = new Date('2022-02-20 17:04:30');
    expect(format_date(date)).toBe('2/20/2022');
});

// test to pluralize a word
test('format_plural() pluralizes a singular word', () => {
    const word1 = format_plural('tiger', 2);
    const word2 = format_plural('lion', 1);

    expect(word1).toBe('tigers');
    expect(word2).toEqual('lion');
});

// test to shorten the url
test('format_url() returns a simplified url string', () => {
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.coolstuff.com/abcdefg/');
    const url3 = format_url('https://www.google.com?q=hello');

    expect(url1).toBe('test.com');
    expect(url2).toBe('coolstuff.com');
    expect(url3).toBe('google.com');
});