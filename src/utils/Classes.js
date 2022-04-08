
class UniDirectionalParameters {
    constructor(yellow, red) {
        this.yellow = yellow
        this.red = red
    }

    isRed(value) {
        return value >= this.red
    }

    isYellow(value) {
        return value >= this.yellow && value < this.red
    }

    isNormal(value) {
        return value < this.yellow
    }
}

class BiDirectionalParameters {
    constructor(lowRed, lowYellow, highYellow, highRed) {
        this.lowRed = lowRed
        this.lowYellow = lowYellow
        this.highRed = highRed
        this.highYellow = highYellow
    }

    isRed(value) {
        return value <= this.lowRed || value >= this.highRed
    }

    isYellow(value) {
        return (value > this.lowRed && value <= this.lowYellow) || (value >= this.highYellow && value < this.highRed)
    }

    isNormal(value) {
        return this.lowYellow < value && value < this.highYellow
    }
}

class Temperature extends BiDirectionalParameters { // in fahrenheit
    constructor(coldRed, coldYellow, hotYellow, hotRed) {
        super(coldRed, coldYellow, hotYellow, hotRed)
    }

    static Default() {
        return new Temperature(-30, 59, 91, 108)
    }
}

class AirQualityIndex extends UniDirectionalParameters {
    constructor(aqiYellow, aqiRed) {
        super(aqiYellow, aqiRed);
    }

    static Default() {
        return new Noise(151, 301)
    }
}

class Noise extends UniDirectionalParameters {
    constructor(nYellow, nRed) {
        super(nYellow, nRed);
    }

    static Default() {
        return new Noise(86, 100)
    }
}

class Humidity extends BiDirectionalParameters { // in percentage
    constructor(dryRed, dryYellow, wetYellow, wetRed) {
        super(dryRed, dryYellow, wetYellow, wetRed);
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