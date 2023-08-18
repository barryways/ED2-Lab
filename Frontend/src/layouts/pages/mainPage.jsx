import footerPage from '../modules/footer'

export function MainPage(){
    return(
        <>
            <div className="main"></div>
            <div className="main-navbar"></div>
            <div className="main-content"></div>
            <div className="main-footer">
            <footerPage/>
            </div>
        </>
    )
}