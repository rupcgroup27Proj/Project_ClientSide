import React, { useState } from 'react';
import { Button, Divider, IconButton, RadioButton, Text, TextInput, useTheme } from 'react-native-paper';
import { ScrollView, View, TouchableOpacity } from 'react-native';


const allTags = [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }, { id: 3, name: 'tag3' },];

//Need to make sure that there are no questions with 0 answers
const SurveyCreator = () => {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [questions, setQuestions] = useState([
        {
            type: 'closed',
            text: '',
            options: ['', '', '', ''],
            correctOption: 0,
        },
        {
            type: 'open',
            text: "qqqqq",
            options: [],
            correctOption: null
        }
    ]);

    const theme = useTheme();


    const addQuestion = (type) => {
        const question = { type };
        if (type === 'closed') {
            question.text = '';
            question.options = ['', '', '', ''];
            question.correctOption = 0;
        } else {
            question.text = '';
            question.options = [];
            question.correctOption = null;
        }
        setQuestions([...questions, question]);
    };

    const updateQuestion = (index, newText) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].text = newText;
        setQuestions(updatedQuestions);
    };

    const updateOption = (questionIndex, optionIndex, newText) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = newText;
        setQuestions(updatedQuestions);
    };

    const addOption = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push("");
        setQuestions(updatedQuestions);
    }

    /////////////////////////////////////////////
    const deleteQuestion = (questionIndex) => {
        const updatedQuestions = questions.filter((option, index) => index != questionIndex);
        setQuestions(updatedQuestions);
    }
    const deleteOption = (questionIndex, optionIndex) => {
        const Questions = [...questions];
        //filter out the option, do not forget to reset the correct answer.
        Questions[questionIndex].options = Questions[questionIndex].options.filter((option, index) => index != optionIndex);
        Questions[questionIndex].correctOption = 0;
        setQuestions(Questions);
    };

    const updateCorrectOption = (questionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctOption = value;
        setQuestions(updatedQuestions);
    };

    return (
        <ScrollView>
            <View style={{ padding: 16 }}>
                <TextInput
                    placeholder="Questionnaire Title"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    mode="outlined"
                    style={{ marginBottom: 16 }}
                />

                <Divider bold={true} />

                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {allTags.map((tag) => (
                        <TouchableOpacity
                            key={tag.id}
                            onPress={() =>
                                //Dual functinality. On clicking a tag, IF the id already exists in the "tags" useState, THAN filter out
                                //all tags that DO NOT match this id - it returns an array with all the selected tags but WITHOUT the
                                //tag that has been clicked. ELSE, store the tag for future use.
                                setTags(tags.includes(tag.id) ? tags.filter((id) => id !== tag.id) : [...tags, tag.id])
                            }
                            style={{
                                backgroundColor: tags.includes(tag.id) ? theme.colors.tertiary : '#F2F2F2',//Conditional styling
                                borderRadius: 16,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                margin: 4,
                            }}
                        >
                            <Text>{tag.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Divider bold={true} />

                <View style={{ marginTop: 16 }}>
                    {questions.map((question, questionIndex) => (
                        <View key={questionIndex} style={{ marginBottom: 16 }}>
                            <Text>Question {questionIndex + 1}:</Text>
                            <TextInput
                                placeholder={`Question text`}
                                value={question.text}
                                onChangeText={(newText) => updateQuestion(questionIndex, newText)}
                                style={{ marginBottom: 8 }}
                            />
                            <Button
                                mode='contained'
                                onPress={() => deleteQuestion(questionIndex)}>
                                Delete question
                            </Button>
                            {questions[questionIndex].options.length !== 4 && question.type === 'closed' &&
                                <View style={{ flexDirection: "row" }}>
                                    <Button
                                        mode='contained'
                                        onPress={() => addOption(questionIndex)}>
                                        Add option
                                    </Button>
                                </View>}
                            {questions[questionIndex].options.length !== 0 &&
                                <View>
                                    <Text style={{ marginLeft: "75%" }}>Correct:</Text>
                                </View>}
                            {question.type === 'closed' &&
                                question.options.map((option, optionIndex) => (
                                    <View key={optionIndex} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                        <TextInput
                                            placeholder={`Option ${optionIndex + 1}`}
                                            value={option}
                                            onChangeText={(newText) => updateOption(questionIndex, optionIndex, newText)}
                                            style={{ flex: 1, marginRight: 8 }}
                                        />
                                        <RadioButton
                                            onPress={() => updateCorrectOption(questionIndex, optionIndex)}
                                            status={questions[questionIndex].correctOption === optionIndex ? 'checked' : 'unchecked'}
                                        />
                                        <IconButton
                                            onPress={() => deleteOption(questionIndex, optionIndex)}
                                            icon="delete"
                                            size={20}
                                        />
                                    </View>
                                ))}

                            <Divider bold={true} />

                        </View>
                    ))}
                </View>

                <View style={{ flexDirection: 'row', alignSelf: 'center', padding: 5 }}>
                    <Button onPress={() => addQuestion('closed')} mode={'elevated'}>
                        Add Closed Question
                    </Button>
                    <Button onPress={() => addQuestion('open')} mode={'elevated'}>
                        Add Open Question
                    </Button>
                </View>

                <Divider bold={true} />

            </View>
        </ScrollView>
    );
};

export default SurveyCreator;
