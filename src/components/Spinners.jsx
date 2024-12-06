function Spinners() {
    return (
        <div className="flex justify-center items-center absolute inset-0 z-10">
            <div className="spinner "></div>

            <style>
                {`
                    .spinner {
                        width: 56px;
                        height: 56px;
                        border-radius: 50%;
                        background: radial-gradient(farthest-side, #474bff 94%, #0000) top/9px 9px no-repeat,
                                    conic-gradient(#0000 30%, #474bff);
                        -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
                        animation: spinner-c7wet2 1s infinite linear;
                    }

                    @keyframes spinner-c7wet2 {
                        100% {
                            transform: rotate(1turn);
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default Spinners;
