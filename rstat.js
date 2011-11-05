function RStat () {
    this.m_n = 0.0;
    this.min = Math.min();
    this.max = Math.max();
    this.m_oldM = this.m_newM = this.m_oldS = this.m_newS = null;
}

RStat.prototype.clear = function clear () {
    this.m_n = 0.0;
    this.min = Math.min();
    this.max = Math.max();
};

RStat.prototype.push = function push (n) {
    this.m_n += 1;

    if (this.m_n === 1) {
        this.min = this.max = n;
        this.m_oldM = this.m_newM = n;
        this.m_oldS = 0.0;
    } else {
        this.m_newM = this.m_oldM + (n - this.m_oldM) / this.m_n;
        this.m_newS = this.m_oldS + (n - this.m_oldM) * (n - this.m_newM);

        this.m_oldM = this.m_newM;
        this.m_oldS = this.m_newS;

        this.min = Math.min(this.min, n);
        this.max = Math.max(this.max, n);
    }
};

RStat.prototype.num_values = function num_values () {
    return this.m_n;
};

RStat.prototype.mean = function mean () {
    if (this.m_n > 0) {
        return this.m_newM;
    } else {
        return 0.0;
    }
};

RStat.prototype.variance = function variance () {
    if (this.m_n > 1) {
        return this.m_newS / (this.m_n - 1);
    } else {
        return 0.0;
    }
};

RStat.prototype.deviation = function deviation () {
    return Math.sqrt(this.variance());
};

module.exports = RStat;