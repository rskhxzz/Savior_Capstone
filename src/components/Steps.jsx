import { useState } from 'react';

const stepsData = [
    {
        id: 1,
        title: "Bagaimana cara melakukan penukaran sampah?",
        description: [
            "Datang ke bank sampah.",
            "Kunjungi halaman bank sampah pada web.",
            "Isi pilih nama bank sampah yang sesuai.",
            "Pilih jenis sampah.",
            "Masukkan berat sampah yang tertera pada mesin.",
            "Klik hitung.",
            "Kemudian klik kirim.",
            "Ingat ya jika berat sampah yang dimasukkan tidak sesuai maka akan langsung tertolak.",
        ],
        color: "bg-blue-500",
    },
    {
        id: 2,
        title: "Cara pembelian sembako dengan uang digital?",
        description: [
            "Datang ke toko yang sudah bekerja sama dengan kami.",
            "Kunjungi halaman toko pada web.",
            "Pilih toko yang dituju.",
            "Pilih barang yang akan dibeli.",
            "Klik checkout.",
            "Pihak toko akan segera menyiapkan barangnya.",
            "Terus kita ambil.",
            "Untuk pembelian bisa dilakukan dimana saja yaa. Namun ketika ingin mengambil barang tetap harus ke toko ya.",
        ],
        color: "bg-pink-500",
    },
];


function StepCard({ step }) {
    return (
        <div
            className={`flex flex-col p-4 rounded-lg shadow-md text-white ${step.color} mb-4`}
        >
            <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full bg-white mr-4"></div>
                <h3 className="text-lg font-bold">{step.title}</h3>
            </div>
            <ul className="ml-8 list-disc">
                {step.description.map((desc, index) => (
                    <li key={index} className="text-sm">
                        {desc}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Steps() {
    return (
        <div className="flex overflow-x-scroll snap-x p-4 space-x-4">
            {stepsData.map((step) => (
                <div key={step.id} className="snap-center">
                    <StepCard step={step} />
                </div>
            ))}
        </div>
    );
}

export default Steps;