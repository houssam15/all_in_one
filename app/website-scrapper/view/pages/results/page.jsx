"use client"
import React, { useState ,useEffect} from 'react';

const ResultsPage = () => {
    const [pages,setPages] = useState([])
    const [ressources,setRessources] = useState([])
    const [images,setImages] = useState([])

 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const pagesResponse = await fetch('https://api.example.com/pages');
                const pagesData = await pagesResponse.json();
                setPages(pagesData);

                const ressourcesResponse = await fetch('https://api.example.com/ressources');
                const ressourcesData = await ressourcesResponse.json();
                setRessources(ressourcesData);

                const imagesResponse = await fetch('https://api.example.com/images');
                const imagesData = await imagesResponse.json();
                setImages(imagesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="  text-sm p-4 bg-gray-950">
            <div className="w-100 p-4 bg-gray-900 ">
                <h2 className="text-xl font-bold mb-4 p-2">Pages</h2>
            <table id="pages" className="table-auto w-full text-white  bg-gray-800">
                <thead>
                    <tr>
                        <th className="px-4 border border-gray-700 py-2">Page</th>
                        <th className="px-4 border border-gray-700 py-2">Broken</th>
                        <th className="px-4 border border-gray-700 py-2">Speed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-600 px-4 py-2">https://espacecouture.fr/</td>
                        <td className="border border-gray-600 px-4 py-2">false</td>
                        <td className="border border-gray-600 px-4 py-2">1.950899999996182</td>
                    </tr>
             
               
                </tbody>
            </table>
            </div>
            <div className="w-100 p-4 bg-gray-900 mt-2">
                <h2 className="text-xl font-bold mb-4">Images</h2>
                <table id="images" className="table-auto w-full text-white  bg-gray-800">
                <thead>
                    <tr>
                        <th className="px-4 border border-gray-700 py-2">Image</th>
                        <th className="px-4 border border-gray-700 py-2">Broken</th>
                        <th className="px-4 border border-gray-700 py-2">Alt</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-600 px-4 py-2">https://espacecouture.fr/</td>
                        <td className="border border-gray-600 px-4 py-2">false</td>
                        <td className="border border-gray-600 px-4 py-2">true</td>
                    </tr>
             
               
                </tbody>
            </table>
            </div>
            <div className="w-100 p-4 bg-gray-900 mt-2">
                <h2 className="text-xl font-bold mb-4">Ressource</h2>
                <table id="images" className="table-auto w-full text-white  bg-gray-800">
                <thead>
                    <tr>
                        <th className="px-4 border border-gray-700 py-2">Image</th>
                        <th className="px-4 border border-gray-700 py-2">Broken</th>
                        <th className="px-4 border border-gray-700 py-2">speed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-600 px-4 py-2">https://espacecouture.fr/</td>
                        <td className="border border-gray-600 px-4 py-2">false</td>
                        <td className="border border-gray-600 px-4 py-2">1.9000</td>
                    </tr>
             
               
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default ResultsPage;
