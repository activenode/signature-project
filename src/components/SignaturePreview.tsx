import React, { forwardRef } from "react";
import { objectHasData } from "../utils/hasData";

interface SignatureData {
  primaryLine: string;
  optional: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  logoSize: number;
}

const SignaturePreview = forwardRef<HTMLDivElement, { data: SignatureData }>(
  ({ data }, ref) => {
    // Calculate the actual width in pixels based on the max-width and percentage
    const logoWidth = (120 * data.logoSize) / 100;

    const baseTextColor = "#6b7280";
    const primaryLineColor = "black";
    const emailTextColor = "#2563eb";
    const hasTextData = objectHasData(data, ["logoSize", "logo"]);
    const baseTextSize = "17px";

    return (
      <div
        ref={ref}
        className="border rounded-md p-4 bg-white w-full max-w-md leading-tight"
        style={{
          fontSize: baseTextSize,
        }}
      >
        <div className="prose">
          <table
            cellPadding="0"
            cellSpacing="0"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    verticalAlign: "top",
                    paddingRight: "15px",
                    width: data.logo ? `${logoWidth}px` : "0",
                    minWidth: data.logo ? `${logoWidth}px` : "0",
                  }}
                >
                  {data.logo && (
                    <img
                      src={data.logo}
                      alt="Company logo"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  )}
                </td>
                <td style={{ verticalAlign: "top", color: baseTextColor }}>
                  {!hasTextData && (
                    <em className="opacity-50">
                      Edit the fields to see a preview
                    </em>
                  )}

                  {data.primaryLine && (
                    <div
                      style={{
                        fontSize: "1em",
                        fontWeight: "bold",
                        color: primaryLineColor,
                        marginBottom: "4px",
                      }}
                    >
                      {data.primaryLine}
                    </div>
                  )}
                  {data.optional && (
                    <div style={{ fontSize: "0.92em", marginBottom: "4px" }}>
                      {data.optional}
                    </div>
                  )}
                  {data.address && (
                    <div
                      style={{
                        fontSize: "0.92em",
                        marginBottom: "4px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {data.address}
                    </div>
                  )}

                  {(data.phone || data.email) && (
                    <>
                      {" "}
                      <hr className="my-6" />

                      <div className="flex flex-col gap-2">
                      {data.phone && (
                        <div
                          style={{ fontSize: "0.92em", marginBottom: "2px" }}
                        >
                          <span
                            style={{ fontSize: "0.8em", width: "44px" }}
                            className="inline-block relative opacity-75"
                          >
                            TEL:
                          </span>
                          {data.phone}
                        </div>
                      )}
                      {data.email && (
                        <div style={{ fontSize: "0.92em" }}>
                          <span
                            style={{ fontSize: "0.8em", width: "44px" }}
                            className="inline-block relative opacity-75"
                          >
                            MAIL:
                          </span>
                          <a
                            href={`mailto:${data.email}`}
                            style={{
                              color: emailTextColor,
                              textDecoration: "none",
                            }}
                          >
                            {data.email}
                          </a>
                        </div>
                      )}
                      </div>
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  },
);

SignaturePreview.displayName = "SignaturePreview";

export default SignaturePreview;
