interface ExpiresOptions {
    expires: boolean
    expireType: 'seconds' | 'minutes' | 'hours' | 'days'
    expireLength: number
}

function set(key: string, data: any, expiresOptions: ExpiresOptions): void {
    const { expires, expireType, expireLength } = expiresOptions;
    if (!expires) {
        localStorage.setItem(key, JSON.stringify((data)));
        return;
    }

    let expireTime = 0;
    if (expireType === "seconds") { expireTime = 1000 * expireLength; }
    if (expireType === "minutes") { expireTime = 60000 * expireLength; }
    if (expireType === "hours") { expireTime = 360000 * expireLength; }
    if (expireType === "days") { expireTime = 86400000 * expireLength; }

    const now = new Date();
    const packet = {
        data,
        expires: now.getTime() + expireTime,
    };

    localStorage.setItem(key, JSON.stringify(packet));
}

function get(key: string): any {
    const now = new Date();

    const stored = localStorage.getItem(key);
    if (!stored) return null;

    const packet = JSON.parse(stored);
    if (now.getTime() > packet.expires) {
        localStorage.removeItem(key);
        return null;
    }

    return packet.data;
}

function del(key: string): void {
    localStorage.removeItem(key);
}

export {
    set,
    get,
    del,
};
