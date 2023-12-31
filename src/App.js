
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header'
// import Sectors from './components/Main/Sectors';
// import Carousel from './components/Main/Carousel';
import DashComparison from './components/Dashboards/DashboardComparison/DashComparison';
// import Navbar from './components/Header/Navbar'


function App() {
  return (
    <div className="App">
      <Header>
        {/* <Navbar/> */}
      </Header>
      <main className='bg-[#F6F6F8] dark:bg-[#09101B]' >
        <DashComparison />

        {/* <Sectors/>
        <Carousel/> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
