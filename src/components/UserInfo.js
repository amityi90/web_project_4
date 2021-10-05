export class UserInfo {
    constructor({ nameSelector, professionSelector }) {
        this._nameSelector = nameSelector;
        this._professionSelector = professionSelector;
        this._nameProfile = document.querySelector(this._nameSelector);
        this._professionProfile = document.querySelector(this._professionSelector);
  
    }

    getUserInfo() {
        console.log(this._name);
        return { name: this._name, profession: this._profession };
    }

    setUserInfo({ name, profession }) {
        this._name = name;
        this._profession = profession;
        this._nameProfile.textContent = name;
        this._professionProfile.textContent = profession;
    }
}