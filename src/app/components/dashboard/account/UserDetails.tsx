import { Smartphone, Mail, MapPin, CreditCard, IdCard } from 'lucide-react';



const ContactDetails = ({profile}:any) => {

  const contactInfo = [
    {
      icon: <Smartphone size={24} />,
      bgColor: 'bg-red-600',
      title: 'Mobile',
      content: `${profile?.user?.phone}`,
    },
    {
      icon: <Mail size={24} />,
      bgColor: 'bg-green-400',
      title: 'Email',
      content: `${profile?.user?.email}`,
    },
    {
      icon: <MapPin size={24} />,
      bgColor: 'bg-blue-800',
      title: 'Current Address',
      content: `${profile?.bank_details?.address}`,

    },
    // {
    //   icon: <CreditCard size={24} />,
    //   bgColor: 'bg-yellow-600',
    //   title: 'Aadhar Number',
    //   content: '1218478963669',
    // },
    // {
    //   icon: <IdCard size={24} />,
    //   bgColor: 'bg-blue-300',
    //   title: 'Pan Number',
    //   content: 'PL24267U',
    // },
  ];


  return (
    <div className="space-y-2">
      {contactInfo.map(({ icon, bgColor, title, content }, index) => (
        <div key={index} className="flex items-center justify-start space-x-2">
          <div className={`p-3 rounded-full ${bgColor} text-white w-fit`}>
            {icon}
          </div>
          <div>
            <h1>{title}</h1>
            <h1>{content}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactDetails;
