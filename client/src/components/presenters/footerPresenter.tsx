import FooterView from "../views/footerView";

const HeaderPresenter = () => {

    const goToUrl = (url: string) => {
        window.location.href = url;
    }

    return (
        <FooterView goToUrl={goToUrl}/>
    );
}

export default HeaderPresenter;