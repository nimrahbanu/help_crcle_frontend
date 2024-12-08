import React from 'react';

const NewsComponent = ({ news }:any) => {


   
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">News</h1>
      <div className="flex flex-col items-center">
        {news.map((item:any, index:number) => (
          <div
            key={index}
            className="max-w-sm  bg-white shadow-lg rounded-lg overflow-hidden my-4 "
          >
            <div className="p-4 animate-flash">
              <h2 className="text-xl font-semibold mb-2">{item.news_title}</h2>
              <div
                className="text-gray-700 mb-4"
                dangerouslySetInnerHTML={{ __html: item.news_content }}
              />
              <span className="text-gray-500 text-sm">Order: {item.news_order}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;
