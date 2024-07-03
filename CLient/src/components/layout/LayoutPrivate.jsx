import react from 'react';

const LayoutPrivate = ({ children }) => {
    return (
        <div>
            <header>
                <Nav/>
            </header>
            <main>{children}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default LayoutPrivate;