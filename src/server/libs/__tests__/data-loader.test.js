import * as axios from 'axios';
import fs from 'fs';
import { join } from 'path';
import { mergeData } from '../libs/data-parser.mjs';
import { fetchData, parseFeatureMap } from '../libs/data-loader.mjs';

jest.mock('axios');

let content;

describe('Data loader module', () => {
  beforeAll(() => {
    content = fs.readFileSync(join(__dirname, './data/disk-content.html'));
  });

  it('', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: content }));

    const amazonBaseUrl = 'https://www.amazon.co.uk';
    const pathUrls = ['mocked'];
    const capacityRegExp = /Capacity[\\n\s]?:[\\n\s]?(\d+)\s?(GB|TB)/i;
    const features = {
      capacity: [capacityRegExp, (matched) => Number(matched[1])],
      capacityUnit: [capacityRegExp, (matched) => String(matched[2])],
    };
    const data = mergeData([], await fetchData(amazonBaseUrl, pathUrls, features));
    const expectedData = [
      {
        title: 'Seagate Backup Plus Hub 8 TB, External Hard Drive, 3.5", USB 3.0',
        image: 'https://m.media-amazon.com/images/I/412SiQIOYHL._SS135_.jpg',
        href: 'https://www.amazon.co.uk/dp/B01IAD5ZC6/',
        condition: 'new',
        features: { capacity: 8192, capacityUnit: 'GB' },
        price: 153.99,
        isPriceChanged: false,
        timestampChanged: expect.any(Number),
        prevPrice: null,
      },
      {
        title: 'Seagate Backup Plus Hub 8 TB, External Hard Drive, 3.5", USB 3.0',
        image: 'https://m.media-amazon.com/images/I/412SiQIOYHL._SS135_.jpg',
        href: 'https://www.amazon.co.uk/gp/offer-listing/B01IAD5ZC6/',
        condition: 'used',
        features: { capacity: 8192, capacityUnit: 'GB' },
        price: 139.13,
        isPriceChanged: false,
        timestampChanged: expect.any(Number),
        prevPrice: null,
      },
      {
        title: 'Seagate Game Drive Hub for Xbox, 8 TB',
        image: 'https://m.media-amazon.com/images/I/41vkw8bB8KL._SS135_.jpg',
        href: 'https://www.amazon.co.uk/dp/B07173WR4B/',
        condition: 'new',
        features: { capacity: 8, capacityUnit: 'TB' },
        price: 169.99,
        isPriceChanged: false,
        timestampChanged: expect.any(Number),
        prevPrice: null,
      },
      {
        title: 'Seagate Game Drive Hub for Xbox, 8 TB',
        image: 'https://m.media-amazon.com/images/I/41vkw8bB8KL._SS135_.jpg',
        href: 'https://www.amazon.co.uk/gp/offer-listing/B07173WR4B/',
        condition: 'used',
        features: { capacity: 8, capacityUnit: 'TB' },
        price: 135,
        isPriceChanged: false,
        timestampChanged: expect.any(Number),
        prevPrice: null,
      },
    ];

    expect(data).toEqual(expectedData);
  });

  it('should extract features from a text', () => {
    const parsedFeatures = parseFeatureMap(
      {
        capacityStr: /Capacity?:\s(\d+)\s?(GB|TB)/i,
        capacityNum: [/Capacity?:\s(\d+)\s?(GB|TB)/i, (m) => Number(m[1])],
      },
      'Capacity: 12TB',
    );

    expect(parsedFeatures).toEqual({
      capacityStr: '12',
      capacityNum: 12,
    });
  });

  it.each(['', ' ', null, false, undefined, 0])('should check wrong values', (textToParse) => {
    const parsedFeatures = parseFeatureMap(
      {
        capacityStr: /Capacity?:\s(\d+)\s?(GB|TB)/i,
        capacityNum: [/Capacity?:\s(\d+)\s?(GB|TB)/i, (m) => Number(m[1])],
      },
      textToParse,
    );

    expect(parsedFeatures).toEqual({});
  });
});
