"use client";
import * as React from "react";

function FlagshipEvents() {
    return (
        <div
            className="flagship-events-container overflow-hidden font-normal py-16 px-10 max-lg:px-5"
            style={{
                fontFamily: "Plus Jakarta Sans, -apple-system, Roboto, Helvetica, sans-serif",
            }}
        >
            <div
                className="events-title flex w-full items-center justify-start text-5xl font-medium uppercase max-lg:text-4xl"
                style={{
                    color: "var(--Primary-text-color, #003233)",
                }}
            >
                <div
                    className="title-text self-stretch w-[852px] my-auto max-lg:max-w-full max-lg:text-4xl"
                    style={{
                        color: "var(--Primary-text-color, #003233)",
                    }}
                >
                    Flagship Annual Events
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div
                    className="nolcha-summit-card pb-6 md:pb-[26px] items-stretch flex w-full flex-col overflow-hidden rounded-lg"
                    style={{
                        backgroundColor: "var(--Surface-color-2, #F4F4F4)",
                    }}
                >
                    <img
                        src="/membership/v2/2.png"
                        alt="Nolcha Summit"
                        className="summit-image aspect-[2.59] object-cover object-center w-full rounded-t-lg"
                    />
                    <div className="summit-content flex mt-4 md:mt-6 w-full px-4 md:px-8 lg:px-16 items-start gap-6 md:gap-10 lg:gap-[100px] justify-between flex-col md:flex-row">
                        <div
                            className="summit-title text-xl md:text-2xl lg:text-2xl font-medium flex-shrink-0 md:ml-4 lg:ml-8 md:w-[655px]"
                            style={{
                                color: "var(--Primary-text-color, #003233)",
                            }}
                        >
                            Nolcha Summit – Miami, New York, London
                        </div>
                        <div
                            className="summit-description text-base leading-relaxed md:w-[650px] lg:w-[700px] md:mr-4 lg:mr-0 md:ml-auto"
                            style={{
                                color: "var(--Tertiary-text-color, #909090)",
                            }}
                        >
                            A high-impact summit held once a year in one of these power cities.
                            <br />
                            Expect influential panels, closed-door investment roundtables,
                            cultural conversations, and evening galas. Every attendee is
                            pre-approved. No exceptions.
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div
                    className="nolcha-retreat-card pb-6 md:pb-[26px] items-stretch flex w-full flex-col overflow-hidden rounded-lg"
                    style={{
                        backgroundColor: "var(--Surface-color-2, #F4F4F4)",
                    }}
                >
                    <img
                        src="/membership/v2/3.png"
                        alt="Nolcha Retreat"
                        className="retreat-image aspect-[2.59] object-cover object-center w-full rounded-t-lg"
                    />
                    <div className="retreat-content flex mt-4 md:mt-6 w-full px-4 md:px-8 lg:px-16 items-start gap-6 md:gap-10 lg:gap-[100px] justify-between flex-col md:flex-row">
                        <div
                            className="retreat-title text-xl md:text-2xl lg:text-2xl font-medium flex-shrink-0 md:ml-4 lg:ml-8 md:w-[655px]"
                            style={{
                                color: "var(--Primary-text-color, #003233)",
                            }}
                        >
                            Nolcha Retreat
                        </div>
                        <div
                            className="retreat-description text-base leading-relaxed md:w-[650px] lg:w-[700px] md:mr-4 md:ml-auto"
                            style={{
                                color: "var(--Tertiary-text-color, #909090)",
                            }}
                        >
                            A private 3-day experience hosted in luxury estates, focused on
                            clarity, elevation, and high-value connection.
                            Each retreat blends wellness, insight, and founder roundtables led
                            by global innovators.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlagshipEvents;
