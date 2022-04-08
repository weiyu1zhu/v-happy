
class UniDirectionalParameters {
    constructor(sev3, sev2) {
        this.sev3 = sev3
        this.sev2 = sev2
    }

    isSev2(value) {
        return value >= this.sev2
    }

    isSev3(value) {
        return value >= this.sev3 && value < this.sev2
    }

    isNormal(value) {
        return value < this.sev3
    }
}

class BiDirectionalParameters {
    constructor(lowSev2, lowSev3, highSev3, highSev2) {
        this.lowSev2 = lowSev2
        this.lowSev3 = lowSev3
        this.highSev2 = highSev2
        this.highSev3 = highSev3
    }

    isSev2(value) {
        return value <= this.lowSev2 || value >= this.highSev2
    }

    isSev3(value) {
        return (value > this.lowSev2 && value <= this.lowSev3) || (value >= this.highSev3 && value < this.highSev2)
    }

    isNormal(value) {
        return this.lowSev3 < value && value < this.highSev3
    }
}

class Temperature extends BiDirectionalParameters { // in fahrenheit
    constructor(coldSev2, coldSev3, hotSev3, hotSev2) {
        super(coldSev2, coldSev3, hotSev3, hotSev2)
    }

    static Default() {
        return new Temperature(-30, 59, 91, 108)
    }
}

class AirQualityIndex extends UniDirectionalParameters {
    constructor(aqiSev3, aqiSev2) {
        super(aqiSev3, aqiSev2);
    }

    static Default() {
        return new Noise(151, 301)
    }
}

class Noise extends UniDirectionalParameters {
    constructor(nSev3, nSev2) {
        super(nSev3, nSev2);
    }

    static Default() {
        return new Noise(86, 100)
    }
}

class Humidity extends BiDirectionalParameters { // in percentage
    constructor(drySev2, drySev3, wetSev3, wetSev2) {
        super(drySev2, drySev3, wetSev3, wetSev2);
    }

    static Default() {
        return new Humidity(0, 25, 55, 80)
    }
}

class User {
    constructor(name, temp, aqi, n, hum) {
        this.name = name
        this.temperature = temp
        this.airQuality = aqi
        this.noise = n
        this.humidity = hum
    }

    static Default(name) {
        return new User(name, Temperature.Default(), AirQualityIndex.Default(), Noise.Default(), Humidity.Default())
    }
}

export {
    Temperature,
    AirQualityIndex,
    Noise,
    Humidity,
    User
}