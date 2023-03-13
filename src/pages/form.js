import NavbarContent from '../components/Navbar';
import { Form, Row, Col, Button } from "react-bootstrap"

import { Link } from "react-router-dom";

import { db } from "../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from 'react';

function FormDetails() {

    const auth = getAuth();

    const [userData, setUserData] = useState([]);
    const [name, setName] = useState("");
    const [objective, setObjective] = useState("");
    const [qualification, setQualification] = useState("");
    const [college, setCollege] = useState("");
    const [email, setEmail] = useState("");
    const [tech, setTech] = useState("");
    const [fileUrl1, setFileUrl1] = useState(null);
    const [skills, setSkills] = useState("");
    const [about, setAbout] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [filename, setFilename] = useState("");
    const [area, setArea] = useState("");

    const [platform, setPlatform] = useState("");

    const [inputList, setInputList] = useState([{ project_title: "", project_desc: "" }]);
    const [experience, setExperience] = useState([{ company: "", role: "", job_desc: "" }]);

    const [update, setUpdate] = useState(false);
    const [remove, setRemove] = useState(false);
    const [portfolio, setPortfolio] = useState(false);
    const [submit, setSubmit] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            onSnapshot(doc(db, "users", auth.currentUser.email), (doc) => {
                setUserData(doc.data());
                console.log(doc.data());

            });
        });

    }, []);
    
    useEffect(() => {
        if (userData && userData.length !== 0) {
            setName(userData.name);
            setObjective(userData.objective);
            setQualification(userData.qualification);
            setCollege(userData.college);
            setEmail(userData.email);
            setTech(userData.tech);
            setFileUrl1(userData.fileUrl1);
            setFilename(userData.filename);
            setSkills(userData.skills);
            setAbout(userData.about);
            setInputList(userData.inputList);
            setExperience(userData.experience);
            setGithub(userData.github);
            setLinkedin(userData.linkedin);
            setPlatform(userData.platform);
            setArea(userData.area);
        
        }

    }, [userData])

    // File upload
    const onFileChange = async (e) => {
        const storage = getStorage();
        console.log(storage)
        const file = e.target.files[0];
        console.log(file.name);
        const fname = file.name;
        setFilename(fname);
        console.log(fname);
        const storageRef = ref(storage, `${file.name}`);
        await uploadBytesResumable(storageRef, file);
        
        await getDownloadURL(ref(storage, storageRef)).then((url) => {
            setFileUrl1(url);
            console.log(url);
        })
    };


    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { project_title: "", project_desc: "" }]);
    };

    //Experience
    // handle input change
    const handleInputChange3 = (e, index) => {
        const { name, value } = e.target;
        const list3 = [...experience];
        list3[index][name] = value;
        setExperience(list3);
    };

    // handle click event of the Remove button
    const handleRemoveClick3 = index => {
        const list3 = [...experience];
        list3.splice(index, 1);
        setExperience(list3);
    };

    // handle click event of the Add button
    const handleAddClick3 = () => {
        setExperience([...experience, { company: "", role: "", job_desc: "" }]);
    };


    const handleSubmit = async (e) => {
        console.log("Handle submit");
        e.preventDefault();

        const data =  {
            name: name,
            objective: objective,
            qualification: qualification,
            college: college,
            email: email,
            tech: tech,
            skills: skills,
            fileUrl1: fileUrl1,
            inputList: inputList,
            experience: experience,
            github: github,
            linkedin: linkedin,
            filename: filename,
            area : area,
            about : about,
            platform : platform
          };
          
        await setDoc(doc(db, "users", auth.currentUser.email), data).then((result) => {
            console.log("data uploaded");
//             setUpdate(true);
//             setRemove(true);
//             setPortfolio(true);
            setSubmit(false);

            }).catch((error) => {
                console.log("Error");
            });
            setName(name);
            setObjective(objective);
            setQualification(qualification);
            setCollege(college);
            setEmail(email);
            setTech(tech);
            setFileUrl1(fileUrl1);
            setSkills(skills);
            setAbout(about);
            setFilename(filename);
            setInputList(inputList);
            setExperience(experience);
            setGithub(github);
            setLinkedin(linkedin);
            setArea(area);
            setPlatform(platform);
            console.log("updated");

      };
      //own func
      const removeFunc = async () => {

        const data =  {
            name: '',
            objective: "",
            qualification: "",
            college: "",
            email: "",
            tech: "",
            skills: "",
            fileUrl: null,
            about: "",
            inputList: [{ project_title: "", project_desc: "" }],
            experience: [{ company: "", role: "", job_desc: "" }],
            github: "",
            linkedin: "",
            filename: "",
            area : "",
            about : "",
            platform : ""
          };

        await setDoc(doc(db, "users", auth.currentUser.email),data).then((result) => {
            console.log("Remove started");
            setName("");
            setObjective("");
            setQualification("");
            setCollege("");
            setEmail("");
            setTech("");
            setSkills("");
            setAbout("");
            setFileUrl1("");
            setFilename("");
            setInputList([{ project_title: "", project_desc: ""}]);
            setExperience([{ company: "", role: "", job_desc: ""}]);
            setGithub("");
            setLinkedin("");
            setArea("");
            setPlatform("");
            setUpdate(false);
            setRemove(false);
            console.log("Removed");
            }).catch((error) => {
                console.log('error');
            });

      }



    //   const removeFunc = async () => {
    //     await deleteDoc(doc(db, "users", auth.currentUser.email)).then((result) => {
    //         setName("");
    //         setObjective("");
    //         setQualification("");
    //         setCollege("");
    //         setEmail("");
    //         setTech("");
    //         setFileUrl1("");
    //         setSkills("");
    //         setAbout("");
    //         setFileUrl("");
    //         setFilename("");
    //         setInputList([{ project_title: "", project_desc: ""}]);
    //         setExperience([{ company: "", role: "", job_desc: ""}]);
    //         setGithub("");
    //         setLinkedin("");
    //         setArea("");
    //         setPlatform("");
    //         setUpdate(false);
    //         setRemove(false);

    //         }).catch((error) => {
    //             console.log('error');
    //         });
    //     };



    return (
        <div style={{
            padding: '0px 300px'
        }}> <NavbarContent />
            <Form className="form" onSubmit={handleSubmit}>
            

            <div className="btns">
                            {portfolio?
                              <Link to={`/portfolio/items?id=${auth.currentUser.email}`} target="_blank" className="link">Portfolio</Link>
                            :<></>}
                            {update?
                                <Button variant="outline-success" className="navBackground" onClick={handleSubmit}> Update </Button>
                            :<></>}
                            {remove?
                                <Button variant="outline-danger" className="remove navBackground" onClick={removeFunc}> Remove </Button>
                            :<></>}
            </div>

                <Col className="column col1">
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="string" placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridNumber">
                            <Form.Label>Objective</Form.Label>
                            <Form.Control type="string" placeholder="eg: Software engg, Front-end developer"
                                value={objective}
                                onChange={(e) => setObjective(e.target.value)}
                                required />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="">
                            <Form.Label>Qualification</Form.Label>
                            <Form.Control type="string"
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                                required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="">
                            <Form.Label>College</Form.Label>
                            <Form.Control type="string"
                                value={college}
                                onChange={(e) => setCollege(e.target.value)}
                                required />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formFile">
                            <Form.Label>Profile pic</Form.Label>
                            <Form.Control type="file"
                                accept="image/*"
                                onChange={onFileChange}
                            />
                        </Form.Group>
                    </Row>


                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Github</Form.Label>
                            <Form.Control placeholder="Github link"
                                type="url"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridNumber">
                            <Form.Label>LinkedIn</Form.Label>
                            <Form.Control type="string"
                                placeholder="LinkedIn Link"
                                type="url"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                required />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Languages</Form.Label>
                            <Form.Control type="string" placeholder="Python, C++"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                required />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Platform</Form.Label>
                            <Form.Control type="string" placeholder="Windows, Mac"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                required />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Tools & Technologies</Form.Label>
                            <Form.Control type="string" placeholder="Technologies"
                                value={tech}
                                onChange={(e) => setTech(e.target.value)}
                                required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Areas of Interest</Form.Label>
                            <Form.Control type="string" placeholder="Area of Interest"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                required />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>About</Form.Label>
                            <Form.Control type="string" placeholder="About yourself.."
                                as="textarea"
                                rows={2}
                                type="string"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                required />
                        </Form.Group>
                    </Row>

                    <Form.Label>Projects</Form.Label>
                    {inputList.map((x, i) => {
                        return (
                            <div className="project">
                                <Form.Group as={Col} controlId="formGridProject">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        type="string"
                                        placeholder="Project title"
                                        name="project_title"
                                        value={x.project_title}
                                        onChange={e => handleInputChange(e, i)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDesc">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        type="string"
                                        placeholder="Description"
                                        name="project_desc"
                                        value={x.project_desc}
                                        onChange={e => handleInputChange(e, i)}
                                    />
                                </Form.Group>
                                <br />
                                {inputList.length !== 1 && <Button variant="outline-dark" onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                {inputList.length - 1 === i && <Button className="add-btn" variant="outline-dark" onClick={() => handleAddClick(i)}>Add</Button>}
                                <br />
                            </div>
                        );
                    })}


                    <Form.Label>Experience</Form.Label>
                    {experience.map((x, i) => {
                        return (
                            <div className="project">
                                <Row>
                                    <Form.Group as={Col} controlId="formGridProject">
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder="Company"
                                            name="company"
                                            value={x.company}
                                            onChange={e => handleInputChange3(e, i)}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridProject">
                                        <Form.Label></Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder="Role"
                                            name="role"
                                            value={x.role}
                                            onChange={e => handleInputChange3(e, i)}
                                        />
                                    </Form.Group>
                                </Row>


                                <Form.Group as={Col} controlId="formGridDesc">
                                    <Form.Label></Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        type="string"
                                        placeholder="Description"
                                        name="job_desc"
                                        value={x.job_desc}
                                        onChange={e => handleInputChange3(e, i)}
                                    />
                                </Form.Group>
                                <br />
                                {experience.length !== 1 && <Button variant="outline-dark" onClick={() => handleRemoveClick3(i)}>Remove</Button>}
                                {experience.length - 1 === i && <Button className="add-btn" variant="outline-dark" onClick={() => handleAddClick3(i)}>Add</Button>}
                                <br />
                            </div>
                        );
                    })}

                </Col>
                {submit?
            <Button variant="outline-success" type="submit">Submit</Button>
            :<></>}
            </Form>
        </div>
    );
}

export default FormDetails;

{/* <Link to={location => `/portfolio/items?id=${auth.currentUser.email}`} target="_blank">Portfolio</Link> */ }
