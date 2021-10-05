export class UserInfo {
    constructor({ nameSelsctor, proffesionSelsctor }) {
        this._nameSelsctor = nameSelsctor;
        this._proffesionSelsctor = proffesionSelsctor;
    }

    getUserInfo() {
        console.log(this._name);
        return { name: this._name, proffesion: this._proffesion };
    }

    setUserInfo({ name, proffesion }) {
        const nameProfile = document.querySelector(this._nameSelsctor);
        const proffesionProfile = document.querySelector(this._proffesionSelsctor);
        this._name = name;
        this._proffesion = proffesion;
        nameProfile.textContent = name;
        proffesionProfile.textContent = proffesion;

    }
}