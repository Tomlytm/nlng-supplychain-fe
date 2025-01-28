import { motion } from 'framer-motion';
import React, { useState } from 'react';
import DemandPlanServices from '@/services/demand_plan_services';  
import { Spinner, useToast } from '@chakra-ui/react'; 
import PageHeader from '@/components/PageHeader'; 

const SearchTable = () => { 
  const toast = useToast();
  const [mescResult, setMescResult] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false); 
  const [searchKeyword, setSearchKeyword] = useState<string>(''); 
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const itemsPerPage = 10; 

  async function findMesc(keyword: string) {
    setLoading(true);
    setSearchKeyword(keyword); 
    try {
      const loginres = await DemandPlanServices.mescSearch(keyword);
      setMescResult(loginres.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.data[0].Message;
      toast({
        status: "error",
        description: errorMessage || "Failed to fetch data.",
        position: "bottom-right",
      });
    }
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text); 
      setCopied(true);
      toast({
        status: "success",
        description: "Copied to clipboard",
        position: "bottom-right",
      });
      setTimeout(() => setCopied(false), 2000); 
    } catch (error) {
      toast({
        status: "error",
        description: "Failed to copy",
        position: "bottom-right",
      });
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(mescResult.length / itemsPerPage);
  const currentItems = mescResult.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <PageHeader title='MESC Directory' />
      
      {/* Search Bar */}
      <div className="relative mb-6 mt-6">
        <svg className='absolute flex items-center h-full left-3' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.90668 2.44278C8.92651 2.44278 7.95593 2.63584 7.05037 3.01093C6.14481 3.38603 5.32199 3.93582 4.6289 4.6289C3.93582 5.32199 3.38603 6.14481 3.01093 7.05037C2.63584 7.95593 2.44278 8.92651 2.44278 9.90668C2.44278 10.8869 2.63584 11.8574 3.01093 12.763C3.38603 13.6686 3.93582 14.4914 4.6289 15.1845C5.32199 15.8775 6.14481 16.4273 7.05037 16.8024C7.95593 17.1775 8.92651 17.3706 9.90668 17.3706C11.8862 17.3706 13.7847 16.5842 15.1845 15.1845C16.5842 13.7847 17.3706 11.8862 17.3706 9.90668C17.3706 7.92713 16.5842 6.02866 15.1845 4.6289C13.7847 3.22915 11.8862 2.44278 9.90668 2.44278ZM0 9.90668C0 7.27927 1.04374 4.75946 2.9016 2.9016C4.75946 1.04374 7.27927 0 9.90668 0C12.5341 0 15.0539 1.04374 16.9118 2.9016C18.7696 4.75946 19.8134 7.27927 19.8134 9.90668C19.8134 12.5341 18.7696 15.0539 16.9118 16.9118C15.0539 18.7696 12.5341 19.8134 9.90668 19.8134C7.27927 19.8134 4.75946 18.7696 2.9016 16.9118C1.04374 15.0539 0 12.5341 0 9.90668Z" fill="#6C6685"/>
        </svg>

        <input
          type="text"
          placeholder="Search MESC number"
          className="w-full pl-12 pr-5 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => findMesc(e.target.value)}
        />
      </div>

      {/* Display Messages */}
      <p className="text-gray-600 font-medium mb-4">
        {loading && searchKeyword ? (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Spinner/> Searching for &quot;{searchKeyword}&quot;...
          </motion.span>
        ) : mescResult.length === 0 && searchKeyword ? (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            No results found for &quot;{searchKeyword}&quot;
          </motion.span>
        ) : mescResult.length === 0 ? (
          'Please search for a MESC number.'
        ) : (
          `${mescResult.length} Results`
        )}
      </p>

      {/* Table */}
      {currentItems.length > 0 && (
        <div className="overflow-x-auto shadow-sm border border-[#E3F1F9] rounded-lg">
          <table className="min-w-full bg-white text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-100 ">
                <th className="px-6 py-3 text-[#959595] text-xs font-semibold">MESC NUMBER</th>
                <th className="px-6 py-3 text-[#959595] text-xs font-semibold"></th>
                <th className="px-6 py-3 text-[#959595] text-xs font-semibold">DESCRIPTION</th>
                <th className="px-6 py-3 text-[#959595] text-xs font-semibold text-center"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <motion.tr
                  key={index}
                  className="border-[#E3F1F9] border hover:bg-gray-50 "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">{item.materialNo}</td>
                  <td className="px-6 py-4 font-medium text-gray-800"></td>
                  <td className="px-6 py-4 text-gray-700 text-xs">{item.materialDescription}</td>
                  <td className="px-6 py-4 text-center">
                  <motion.svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      whileTap={{ scale: 1.2 }} // Scale effect on tap
                      whileHover={{ scale: 1.1, rotate: 15 }} // Animation on hover
                      className={`cursor-pointer outline-none ${copied ? 'text-green-500' : 'text-gray-500'}`}
                      onClick={() => handleCopy(item.materialNo)} // Trigger copy on click
                    >
                      <path
                        d="M4.012 16.737C3.70534 16.5622 3.45027 16.3095 3.27258 16.0045C3.09488 15.6995 3.00085 15.353 3 15V5C3 3.9 3.9 3 5 3H15C15.75 3 16.158 3.385 16.5 4M7 9.667C7 8.95967 7.28099 8.28131 7.78115 7.78115C8.28131 7.28099 8.95967 7 9.667 7H18.333C18.6832 7 19.03 7.06898 19.3536 7.20301C19.6772 7.33704 19.9712 7.53349 20.2189 7.78115C20.4665 8.0288 20.663 8.32281 20.797 8.64638C20.931 8.96996 21 9.31676 21 9.667V18.333C21 18.6832 20.931 19.03 20.797 19.3536C20.663 19.6772 20.4665 19.9712 20.2189 20.2189C19.9712 20.4665 19.6772 20.663 19.3536 20.797C19.03 20.931 18.6832 21 18.333 21H9.667C9.31676 21 8.96996 20.931 8.64638 20.797C8.32281 20.663 8.0288 20.4665 7.78115 20.2189C7.53349 19.9712 7.33704 19.6772 7.20301 19.3536C7.06898 19.03 7 18.6832 7 18.333V9.667Z"
                        stroke="#D5D5D5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4 text-gray-500">
          <p className="text-sm">Page {currentPage} of {totalPages}</p>
          <div className="flex space-x-2">
            <button  onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
              Previous
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 text-sm font-medium bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchTable;
