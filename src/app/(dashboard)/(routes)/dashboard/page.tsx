
import Accordion from "@/app/components/Accordion/Accordion";
import LevelsGrid from "@/app/components/Accordion/LevelsGrid";
import SevenLevelTransactionGrid from "@/app/components/Accordion/SevenLevelTransactionGrid";
import HelpCardItem from "@/app/components/dashboard/HelpCardItem";
import DataGrid from "@/app/components/demo/DataGrid";
import NewsComponent from "@/app/components/NewsComponent";
import { getUserId } from "@/app/utils/getUserId";
import { getData } from "@/app/utils/utils/api";
import { AppWindow, Award, Calendar, ChartNoAxesCombined, CheckCheck, GitGraph, HandCoins, HelpCircle, IndianRupee, Target, Users } from "lucide-react";
import ReceivingHelpComponent from "@/app/components/Accordion/ReceivingHelpComponent";
import GivingHelp from "@/app/components/dashboard/GivingHelp";











const page = async () => {






  const userId = getUserId();



  const customer = await getData(userId);




  if (!customer?.data) {
    return <div>Error loading user data.</div>;
  }



  const { user, package_name, giving_help, news, direct_team, total_team,

    receiving_help,
    taking_sponcer,
    taking_seven_level_transaction,
    seven_level_transaction,
    e_pin,

    auto_pool_income,
    total_level_income,
    received_pending_sponsor,
    received_sponsor,
    total_pending_receiving_help_count,
    total_receiving_help_count,
    total_pending_giving_help_count,
    total_giving_help_count

  } = customer.data;



  const data = [
    {
    title : `Welcome (${user.status})`,

      date: user?.activated_date || 'not found',
      icon: <Calendar />,
    },
    {
      title: 'Package',
      date: package_name,
      icon: <Award />,
    },
    {
      title: 'Direct Team',
      date: direct_team,
      icon: <Users />,
      link: '/dashboard/details/direct' // Add your link here
    },
    {
      title: 'Total Team',
      date: total_team,
      icon: <Target />,
      link: '/dashboard/details/downline' // Add your link here
    },
    {
      title: 'Given Help',

      date: ` Rs ${total_giving_help_count} /-` || 'not found',

      icon: <HelpCircle />,
      link: '/dashboard/help/giving?status=Active' // Add your link here
    },
    {
      title: 'Giving Help',
      date: `Pending: Rs ${total_pending_giving_help_count} /-` || 'not found',
      icon: <HelpCircle />,
      link: '/dashboard/help/giving?status=Pending' // Add your link here
    },
    {
      title: 'Received Help',
      date: ` Rs ${total_receiving_help_count}  /-` || 'not found',
      icon: <HelpCircle />,
      link: '/dashboard/help/receiving?status=Active' // Add your link here
    },
    {
      title: 'Receiving Help',
      date: `Pending: Rs ${total_pending_receiving_help_count}  /-` || 'not found',
      icon: <HelpCircle />,
      link: '/dashboard/help/receiving?status=Pending' // Add your link here
    },
    {
      title: 'Received Sponsor',
      date: 'Rs ' + received_sponsor + ' /-' || 'not found',

      icon: <Users />,
      link: '/dashboard/help/sponsor?status=Active' // Add your link here

    },
    {
      title: 'Receiving Sponsor',
      date: 'Rs ' + received_pending_sponsor + ' /-' || 'not found',
      icon: <Users />,
      link: '/dashboard/help/sponsor?status=Pending' // Add your link here

    },

    {
      title: 'Pin Balance',
      date: e_pin || '0',
      icon: <IndianRupee />,
      link: '/dashboard/e-pin' // Add your link here
    },

    {
      title: 'Total Level Income',
      date: 'Rs ' + total_level_income + ' /-' || 'not found',
      icon: <Users />,

      link: '/dashboard/level_income/tabtwo' // Add your link here


    },
    // { 
    //   title: 'Level Income', 
    //   date: total_team, 
    //   icon: <Target />, 
    // },
    // { 
    //   title: 'Auto Pool Income', 
    //   date: 'Rs ' +  auto_pool_income + ' /-' || 'not found', 
    //   icon: <Users />, 
    // },
  ];



  const levels = [
    { level: "First Level", ...seven_level_transaction?.first_level },
    { level: "Second Level", ...seven_level_transaction?.second_level },
    { level: "Third Level", ...seven_level_transaction?.third_level },
    { level: "Fourth Level", ...seven_level_transaction?.fourth_level },
    { level: "Fifth Level", ...seven_level_transaction?.five_level },
    { level: "Sixth Level", ...seven_level_transaction?.six_level },
    { level: "Seventh Level", ...seven_level_transaction?.seven_level },
  ];



  const acordion = [
    {
      icon: <HelpCircle color="#D97706" />,
      title: 'Giving Help',
      content: <div>

        {giving_help && <GivingHelp giving_help={giving_help} userId={userId} />


        }





      </div>, // Replace with actual content

      // active: giving_help ? 0 : null

      active: !!giving_help, // Directly using the boolean expression

    },
    {
      icon: <HandCoins color="#D97706" />
      ,
      title: 'Receiving Help',
      content: <div>      <ReceivingHelpComponent taking_help={receiving_help} userId={userId} />
      </div>, // Replace with actual content
      //  active: receiving_help ? 1 : null

      active: !!receiving_help, // Directly using the boolean expression

    },
    {
      icon: <AppWindow
        color="#D97706" />,
      title: 'Giving Seven Level Transaction',
      content: <div >

        {
          seven_level_transaction &&

          <LevelsGrid levels={seven_level_transaction} />
        }



      </div>, // Replace with actual content

      // active: seven_level_transaction ? 2 : null

      active: !!seven_level_transaction, // Directly using the boolean expression


    },
    {

      icon: <CheckCheck
        color="#D97706" />,
      title: 'Receiving Seven Level Transaction',
      content: <div>
        {

          taking_seven_level_transaction &&

          <SevenLevelTransactionGrid taking_seven_level_transaction={taking_seven_level_transaction} userId={userId} />

        }





      </div>, // Replace with actual content


      // active: taking_seven_level_transaction ? 3 : null

      active: !!taking_seven_level_transaction, // Directly using the boolean expression




    },
  ];


  const activeIndices = acordion.reduce<number[]>((acc, item, index) => {
    if (item.active) {
      acc.push(index);
    }
    return acc;
  }, []);
  

  console.log("Indec dsa ...", activeIndices)

  return (





    <>





      {/* <header className="btn_bg mb-1  ">
        <div className='flex items-center justify-between mx-4'>
          <div className='p-2 font-bold text-white mt-24 lg:pl-[300px]'>

          </div>
          <div className="flex flex-row lg:flex-row lg:space-x-8 mt-8 text-center lg:text-left mx-auto space-x-2">
            <div className="flex items-center justify-center gap-2 p-2 bg-white text-black rounded-lg shadow-md">
              <ChartNoAxesCombined size={32} />
              <div>
                <div className="text-sm font-medium">Total Giving Help</div>
                <div className="text-lg font-bold">₹ {total_giving_help_count}</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 bg-white text-black rounded-lg shadow-md lg:mt-0">
              <GitGraph size={32} />
              <div>
                <div className="text-sm font-medium">Total Received Help</div>
                <div className="text-lg font-bold">₹ {total_receiving_help_count}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:pl-96 pl-8 font-bold text-white text-2xl mt-4'>{user.name}</div>
        <div className='divide-y h-[1px] bg-[#A9A9A9] my-2' />

      </header> */}




      <main className="flex-1 ">




        <Accordion data={acordion} active={activeIndices} />

        <DataGrid data={data} />



        <HelpCardItem data={customer.data} />

        <NewsComponent news={news} />


        <div className="h-20 md:h-0">


        </div>

      </main>



    </>



















  )
}

export default page