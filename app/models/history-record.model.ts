export class HistoryRecord
{
    breed: String
    date: String
    weightMin: String
    weightMax: String
    heightMin: String
    heightMax: String
    input: String
    // outputHistory: String

    constructor(breed: String, date: String, weightMin: String, weightMax: String, heightMin: String, heightMax: String, input: String)//, outputHistory: String)
    {
        this.breed = breed;
        this.date = date;
        this.weightMin = weightMin;
        this.weightMax = weightMax;
        this.heightMin = heightMin;
        this.heightMax = heightMax;
        this.input = input;
        // this.outputHistory = outputHistory;
    }
}
