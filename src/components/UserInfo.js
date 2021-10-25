export class UserInfo {
    constructor({ nameSelector, professionSelector }) {
        this._nameSelector = nameSelector;
        this._professionSelector = professionSelector;
        this._nameProfile = document.querySelector(this._nameSelector);
        this._professionProfile = document.querySelector(this._professionSelector);
    }

    getUserInfo() {
        return { name: this._nameProfile.textContent, profession: this._professionProfile.textContent, id: this._id };
    }

    setUserInfo(info) {
        this._name = info.name;
        this._profession = info.about;
        this._nameProfile.textContent = info.name;
        this._professionProfile.textContent = info.about;
        this._id = info._id;
    }
}