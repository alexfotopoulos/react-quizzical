export function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export async function fetchData() {
    let response = await fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&encode=base64')
    let data = await response.json()
    console.log(data.results)
    for (let result of data.results) {
        result.category = b64DecodeUnicode(result.category)
        result.question = b64DecodeUnicode(result.question)
        result.correct_answer = b64DecodeUnicode(result.correct_answer)
        result.difficulty = b64DecodeUnicode(result.difficulty)
        result.type = b64DecodeUnicode(result.type)
        let choices = []
        for (let answer of result.incorrect_answers) {
            choices.push(b64DecodeUnicode(answer))
        }
        choices.push(result.correct_answer)
        shuffle(choices)
        result.choices = choices
    }
    return data.results
}