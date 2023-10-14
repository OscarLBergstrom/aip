import FooterView from "../views/footerView";

const HeaderPresenter = () => {

    const goToUrl = (url: string) => {
        document.location = url;
    }

    return (
        <FooterView goToUrl={goToUrl}/>
    );
}

export default HeaderPresenter;