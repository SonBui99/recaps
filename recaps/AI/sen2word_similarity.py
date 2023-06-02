import numpy as np 
from sklearn.metrics.pairwise import cosine_similarity


def sentence_embedding(sentence, model):
    words = sentence.strip().split()
    embeddings = np.zeros((len(words), model.get_dimension()))
    for i, word in enumerate(words):
        embeddings[i] = model[word]
    return np.mean(embeddings, axis=0)

def similar(sentence1, sentence2, model):
    vector1 = sentence_embedding(sentence1, model)
    vector2 = sentence_embedding(sentence2, model)
    similarity = cosine_similarity([vector1], [vector2])[0][0]
    # print(similarity*100)
    return similarity*100