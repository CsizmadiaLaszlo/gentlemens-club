import {Footer, Header} from "../components/layout";

export default function Restaurant() {
    return (
        <div>
            <Header></Header>
            <div className={"container"}>
                <main role={"main"} className={"pb-3"}>
                    <h1>restaurant</h1>
                </main>
            </div>
            <Footer></Footer>
        </div>
    );
}