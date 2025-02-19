"use client"

import { Document } from "@htmldocs/react";

const createTemplate = (config: any) => {
  return {
    template: Document,
    styles: config.styles,
    PreviewProps: {
      personalInfo: {
        name: "John Doe",
        email: "john@example.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA"
      },
      experience: [
        {
          title: "Senior Developer",
          company: "Tech Corp",
          location: "San Francisco, CA",
          startDate: "2020",
          endDate: "Present",
          description: ["Led development of core platform features", "Managed team of 5 engineers"]
        }
      ],
      education: [
        {
          degree: "B.S. Computer Science",
          school: "University of Technology",
          location: "San Francisco, CA",
          graduationDate: "2019"
        }
      ],
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"]
    }
  };
};

export const themes = {
  'Tech Bro': createTemplate({
    styles: {
      name: {
        fontSize: '24pt',
        fontWeight: 'bold',
        borderBottom: '1.5pt solid black',
        marginBottom: '9pt'
      },
      heading: {
        fontSize: '13.5pt',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: '4.5pt'
      },
      subheading: {
        fontSize: '12pt',
        fontWeight: '600'
      },
      body: {
        fontSize: '10.5pt'
      },
      bodySmall: {
        fontSize: '9pt'
      },
      section: {
        marginBottom: '13.5pt'
      },
      item: {
        marginBottom: '6.75pt'
      }
    }
  }),

  'Manager': createTemplate({
    styles: {
      name: {
        fontSize: '31.5pt',
        fontFamily: 'Times-Roman',
        fontWeight: 'bold',
        borderBottom: '3pt solid black',
        marginBottom: '2.25pt'
      },
      heading: {
        fontSize: '9pt',
        fontFamily: 'Times-Roman',
        fontWeight: 'bold',
        borderBottom: '1.5pt solid black',
        marginBottom: '1.125pt'
      },
      subheading: {
        fontSize: '7.5pt',
        fontFamily: 'Times-Roman',
        fontWeight: '600'
      },
      body: {
        fontSize: '6pt',
        fontFamily: 'Times-Roman'
      },
      bodySmall: {
        fontSize: '4.5pt',
        fontFamily: 'Times-Roman'
      },
      section: {
        marginBottom: '2.25pt'
      },
      item: {
        marginBottom: '1.125pt'
      }
    }
  }),

  'Creative': createTemplate({
    styles: {
      name: {
        fontSize: '33pt',
        fontFamily: 'Helvetica',
        fontWeight: '800',
        color: '#9333ea',
        marginBottom: '2.25pt'
      },
      heading: {
        fontSize: '10.5pt',
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        color: '#9333ea',
        marginBottom: '1.125pt'
      },
      subheading: {
        fontSize: '8.25pt',
        fontFamily: 'Helvetica',
        fontWeight: '600',
        color: '#db2777'
      },
      body: {
        fontSize: '6.75pt',
        fontFamily: 'Helvetica'
      },
      bodySmall: {
        fontSize: '5.25pt',
        fontFamily: 'Helvetica'
      },
      section: {
        marginBottom: '3.375pt'
      },
      item: {
        marginBottom: '1.6875pt'
      }
    }
  })
};