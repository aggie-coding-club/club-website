import React, {Component} from 'react';
import styles from './BackgroundInfoStyles.js'

import ScrollAnimation from "react-animate-on-scroll";

//Icon Imports
import FaCheck from 'react-icons/lib/fa/puzzle-piece';
import FaWrench from 'react-icons/lib/fa/wrench';
import FaComments from 'react-icons/lib/fa/comments';

//Material UI Imports
import Chip from 'material-ui/Chip';




class BackgroundInfo extends Component {
    render() {
        return( 

            <div style={styles.backgroundDivMain}>
                        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                            <h1 className="header" style={styles.headerStyle}> what we do </h1>
                            <p style={styles.mottoIdea}> All it takes is an idea, a computer, and the willingness to build something amazing. </p>
                            <p style={styles.description}> Here at Aggie Coding Club, we believe that anyone, any major, from any background can learn how to code. Coding doesn&#39;t take anything more than than the computer that you have for college, the text editor that comes with it, and yourself. All it takes is a great idea and the willingness to execute it.</p>
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                                <div style={styles.column}>
                                    <FaCheck style={styles.largeIcon} />
                                    <h1 className="columnHeader"> Projects </h1>
                                    <Chip className="chips" style={styles.topChip} label="Work on a 3-5 person team" />
                                    <Chip className="chips" style={styles.middleChip} label="Build an app, make a website, or even design a game" />
                                    <Chip className="chips" style={styles.bottomChip} label="Gain experience with new languages and frameworks" />
                                </div>
                                <div style={styles.column}>
                                    <FaWrench style={styles.largeIcon} />
                                    <h1 className="columnHeader"> Workshops </h1>
                                    <Chip className="chips" style={styles.topChip} label="Learn new techologies from club members" />
                                    <Chip className="chips" style={styles.middleChip} label="Get exposed to coding concepts and Github version-control" />
                                    <Chip className="chips" style={styles.bottomChip} label="Acquire resume help and internship interview experience" />
                                </div>
                                <div style={styles.column}>
                                    <FaComments style={styles.largeIcon} />
                                    <h1 className="columnHeader"> Company Talks </h1>
                                    <Chip className="chips" style={styles.topChip} label="Network with some of the top tech companies" />
                                    <Chip className="chips" style={styles.middleChip} label="Learn what managers want to hear in job interviews" />
                                    <Chip className="chips" style={styles.bottomChip} label="Talk with professionals who have experience in the industry" />
                                </div>
                            </div>
                        </ScrollAnimation>
                    </div>

            );
    }
} 
export default BackgroundInfo;