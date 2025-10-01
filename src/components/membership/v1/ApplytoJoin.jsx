"use client";
import * as React from "react";

function ApplyToJoin() {
    return (
        <div
            className="overflow-hidden px-16 rounded-3xl bg-[#EBE2D7] max-md:px-5"
            data-name="Background"
        >
            <div className="flex gap-5 max-md:flex-col">
                <div className="w-[38%] max-md:ml-0 max-md:w-full" data-name="column">
                    <div className="flex flex-col self-stretch my-auto w-full mt-10 min-md:mt-35">
                        <div className="w-full">
                            <div
                                className="flex flex-col justify-center items-start py-1.5 w-full text-3xl sm:text-4xl lg:text-5xl font-medium uppercase text-teal-950"
                                data-name="Heading 3"
                            >
                                <div
                                    className="text-teal-950"
                                    data-name="Apply to Join"
                                >
                                    Apply to Join
                                </div>
                            </div>
                            <div
                                className="mt-1 text-base sm:text-lg text-neutral-900"
                                data-name="Membership by Invitation or Application Only Waitlist and screening required."
                            >
                                Membership by Invitation or Application Only
                                <br />
                                Waitlist and screening required.
                            </div>
                        </div>
                        <div
                            className="flex gap-2.5 justify-center items-center self-start px-5 py-2.5 mt-5 text-lg bg-[#E7F0D3] rounded text-neutral-900 w-full sm:w-auto"
                        >
                            <div
                                className="self-stretch my-auto text-neutral-900 text-center"
                                data-name="Apply now"
                            >
                                Apply now
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="ml-5 w-[62%] max-md:ml-0 max-md:w-full"
                    data-name="column"
                >
                    <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/7309cf3d1ce7457a8bd89c59a2a44591/fc40273d7026bf7f8f82c4f6aa4ffb796d30ec9d?placeholderIfAbsent=true"
                            className="object-contain max-w-full rounded-lg aspect-[2.01] w-[457px]"
                            alt="Membership benefit image 1"
                        />
                        <img
                            src="https://api.builder.io/api/v1/image/assets/7309cf3d1ce7457a8bd89c59a2a44591/759a79cfedf2a3bb3b7d13959322d23215ba0975?placeholderIfAbsent=true"
                            className="object-contain self-end mt-8 max-w-full rounded-lg aspect-[2.11] w-[470px]"
                            alt="Membership benefit image 2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplyToJoin;
