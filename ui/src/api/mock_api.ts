/**
 * 
 */
import APIInterface from './api_interface';

const space = '\u00A0';
const tabSpaceNbr = 2;

class MockAPI implements APIInterface {
    linesOfCode: Array<string>;
    getLinesOfCode(): Array<string> {
        return this.linesOfCode;
    }
    constructor(linesOfCode: Array<string>) {
        this.linesOfCode = linesOfCode;
    }
}

const linesOfCode: Array<string> = [
    '<div id=\'container\'>',
        `${space.repeat(tabSpaceNbr)}<Title />`,
        `${space.repeat(tabSpaceNbr)}<Navbar />`,
        `${space.repeat(tabSpaceNbr)}<Sidebar />`,
        `${space.repeat(tabSpaceNbr)}<Editor />`,
    '</div>'
];    

const mockAPI = new MockAPI(linesOfCode);

export { mockAPI as API };
