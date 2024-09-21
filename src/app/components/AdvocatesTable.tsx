"use client";

import { Advocate } from "../types";
import Pill from "./Pill";
import Td from "./Table/Td";
import Th from "./Table/Th";

// Add sorting?
export default function AdvocatesTable({
  advocates,
}: {
  advocates: Advocate[];
}) {
  return (
    <table className="border border-gray-300 rounded-md w-full">
      <thead className="border-2 bg-slate-200">
        <Th>Name</Th>
        <Th>City</Th>
        <Th>Specialties</Th>
        <Th>Years of Experience</Th>
        <Th>Phone Number</Th>
      </thead>
      <tbody className="bg-slate-100">
        {advocates.map((advocate) => {
          return (
            <tr key={advocate.id}>
              <Td>
                {advocate.firstName +
                  " " +
                  advocate.lastName +
                  ", " +
                  advocate.degree}
              </Td>
              <Td>{advocate.city}</Td>
              <Td>
                <div className="max-w-[400px]">
                  {advocate.specialties.map((s: string) => (
                    <Pill colorClass={randomColor()} key={s}>
                      {s}
                    </Pill>
                  ))}
                </div>
              </Td>
              <Td>{advocate.yearsOfExperience}</Td>

              <Td>
                <a href={`tel:${advocate.phoneNumber}`}>
                  ☎️ {advocate.phoneNumber} {/* TODO: format phone number */}
                </a>
              </Td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// Note: I would map these colors to the specialties. Using random colors here for speed/convenience.
function randomColor() {
  return [
    "bg-red-100",
    "bg-orange-100",
    "bg-yellow-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-indigo-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-gray-100",
    "bg-teal-100",
    "bg-cyan-100",
    "bg-lime-100",
    "bg-emerald-100",
    "bg-sky-100",
    "bg-violet-100",
    "bg-fuchsia-100",
    "bg-rose-100",
    "bg-amber-100",
    "bg-slate-100",
    "bg-zinc-100",
    "bg-neutral-100",
    "bg-stone-100",
    "bg-red-200",
    "bg-orange-200",
    "bg-yellow-200",
    "bg-green-200",
  ][Math.floor(Math.random() * 26)];
}
