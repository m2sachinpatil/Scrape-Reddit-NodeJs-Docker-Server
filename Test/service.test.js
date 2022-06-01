
const { scrapeReddit } = require('../Service/service');
const axios = require("axios");

test('shoud be define', () => {
    expect(scrapeReddit).toBeDefined()
});

jest.mock("axios");

describe('scrapeReddit call success but url not formatted with required condition', () => {
    it('should 200 response from axios', async () => {

        const post = [
            {
                urlMeme: [
                    attribs = ""
                ]
            }
        ];

        const postModel = {
            title: "",
            url: ""
        };

        axios.get.mockResolvedValue({ data: post });

        const result = await scrapeReddit();

        expect(result).toEqual(postModel);
    });
});